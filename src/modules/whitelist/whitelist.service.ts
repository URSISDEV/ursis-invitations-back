import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserWhitelist } from './entities/user-whitelist.entity';
import { CreateWhitelistDto } from './dto/create-whitelist.dto';
import { CustomLoggerService } from '../../common/logger/logger.service';

@Injectable()
export class WhitelistService {
  constructor(
    @InjectRepository(UserWhitelist)
    private readonly userWhitelistRepository: Repository<UserWhitelist>,
    private readonly logger: CustomLoggerService,
  ) {}

  async create(createWhitelistDto: CreateWhitelistDto, ip?: string): Promise<UserWhitelist> {
    this.logger.log(`Attempting to register new user: ${createWhitelistDto.email}`, 'WhitelistService');

    // Verificar si el email ya existe
    const existingUser = await this.userWhitelistRepository.findOne({
      where: { email: createWhitelistDto.email },
    });

    if (existingUser) {
      this.logger.warn(`Registration failed - Email already exists: ${createWhitelistDto.email}`, 'WhitelistService');
      throw new ConflictException('El email ya está registrado en la whitelist');
    }

    const userWhitelist = this.userWhitelistRepository.create(createWhitelistDto);
    const savedUser = await this.userWhitelistRepository.save(userWhitelist);

    // Log del registro exitoso!
    this.logger.logUserRegistration({
      name: savedUser.name,
      email: savedUser.email,
      isEventOrganizer: savedUser.isEventOrganizer,
      ip
    });

    this.logger.log(`User successfully registered: ${savedUser.email} (ID: ${savedUser.id})`, 'WhitelistService');

    return savedUser;
  }

  async findAll(): Promise<UserWhitelist[]> {
    this.logger.log('Fetching all whitelist users', 'WhitelistService');
    const users = await this.userWhitelistRepository.find({
      order: { createdAt: 'DESC' },
    });
    this.logger.log(`Retrieved ${users.length} whitelist users`, 'WhitelistService');
    return users;
  }

  async findByEmail(email: string): Promise<UserWhitelist | null> {
    return await this.userWhitelistRepository.findOne({
      where: { email },
    });
  }
}
