import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global para todos los endpoints
  app.setGlobalPrefix('api');

  // Tomar el puerto desde el .env o usar 3000 por defecto
  const port = process.env.PORT ?? 3000;

  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`);
}

bootstrap();
