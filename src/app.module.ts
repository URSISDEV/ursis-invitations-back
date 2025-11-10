import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { InvitationsModule } from './modules/invitations/invitations.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true, // disponible en todos los módulos
    }),
    InvitationsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
