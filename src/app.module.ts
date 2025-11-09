import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true, // disponible en todos los módulos
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
