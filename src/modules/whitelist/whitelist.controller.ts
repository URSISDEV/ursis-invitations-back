import { Controller, Get, Post, Body, HttpStatus, HttpCode, UseGuards, UnauthorizedException, Headers, Req } from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { WhitelistService } from './whitelist.service';
import { CreateWhitelistDto } from './dto/create-whitelist.dto';
import { UserWhitelist } from './entities/user-whitelist.entity';
import { CustomLoggerService } from '../../common/logger/logger.service';
import type { Request } from 'express';

@Controller('whitelist')
export class WhitelistController {
  constructor(
    private readonly whitelistService: WhitelistService,
    private readonly logger: CustomLoggerService,
  ) {}

  private validateBasicAuth(authorization: string): boolean {
    if (!authorization || !authorization.startsWith('Basic ')) {
      return false;
    }

    const base64Credentials = authorization.slice('Basic '.length);
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    return username === 'ursis' && password === '159734682Ursis!';
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 3, ttl: 60000 } }) // 3 intentos por minuto
  async register(
    @Body() createWhitelistDto: CreateWhitelistDto,
    @Req() request: Request,
  ): Promise<{
    message: string;
    data: UserWhitelist;
  }> {
    const clientIp = request.ip || request.connection.remoteAddress || 'unknown';
    const userAgent = request.get('User-Agent') || 'unknown';
    
    this.logger.log(`Registration attempt from IP: ${clientIp}, User-Agent: ${userAgent}`, 'WhitelistController');
    
    const userWhitelist = await this.whitelistService.create(createWhitelistDto, clientIp);
    return {
      message: 'Usuario registrado exitosamente en la whitelist',
      data: userWhitelist,
    };
  }

  @Get()
  async findAll(
    @Headers('authorization') authorization: string,
    @Req() request: Request,
  ): Promise<UserWhitelist[]> {
    const clientIp = request.ip || request.connection.remoteAddress || 'unknown';
    const userAgent = request.get('User-Agent') || 'unknown';
    
    if (!this.validateBasicAuth(authorization)) {
      this.logger.logAuthAttempt(false, clientIp, userAgent);
      this.logger.warn(`Failed authentication attempt from IP: ${clientIp}`, 'WhitelistController');
      throw new UnauthorizedException('Credenciales de autenticación requeridas');
    }
    
    this.logger.logAuthAttempt(true, clientIp, userAgent);
    this.logger.log(`Successful authentication from IP: ${clientIp}`, 'WhitelistController');
    
    return await this.whitelistService.findAll();
  }
}
