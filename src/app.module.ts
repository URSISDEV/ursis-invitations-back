import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { InvitationsModule } from './modules/invitations/invitations.module';
import { WhitelistModule } from './modules/whitelist/whitelist.module';
import { LoggerModule } from './common/logger/logger.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ThrottleLoggingInterceptor } from './common/interceptors/throttle-logging.interceptor';

@Module({
  imports: [
    LoggerModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 60000, // 1 minuto
        limit: 10, // 10 requests por minuto (global)
      },
      {
        name: 'medium',
        ttl: 600000, // 10 minutos
        limit: 100, // 100 requests por 10 minutos
      }
    ]),
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true, // disponible en todos los módulos
    }),
    InvitationsModule,
    WhitelistModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ThrottleLoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
