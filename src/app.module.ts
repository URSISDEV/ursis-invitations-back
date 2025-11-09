import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true, // disponible en todos los módulos
    }),
  ],
})
export class AppModule {}
