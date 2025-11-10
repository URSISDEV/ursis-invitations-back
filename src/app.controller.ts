import { Controller, Get } from '@nestjs/common';

@Controller('invitations')
export class AppController {
  @Get()
  getHello(): string {
    return 'HOLAAAAAAAAA COMO ESTAS BIEN';
  }
}
