import { Controller, Get } from '@nestjs/common';

@Controller('invitations')
export class AppController {
  @Get()
  getHello(): string {
    return 'Hola mundo desde !! Invitations API 🚀';
  }
}
