import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'API de Invitaciones - Servidor funcionando correctamente';
  }

  @Get('health')
  getHealth(): object {
    return { 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      services: ['invitations', 'whitelist']
    };
  }
}
