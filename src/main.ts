import * as crypto from 'crypto';
if (!globalThis.crypto) {
  (globalThis as any).crypto = crypto;
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: [
      'https://invia.ursis.com.ar',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:4200',  // Angular dev server
      'http://localhost:5173',  // Vite dev server
      'http://localhost:5521'   // Tu frontend actual
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
  });

  // Prefijo global para todos los endpoints
  app.setGlobalPrefix('api');

  // Tomar el puerto desde el .env o usar 3000 por defecto
  const port = process.env.PORT ?? 3000;

  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`);
}

bootstrap();
