import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { existsSync } from 'fs';
import { join } from 'path';

// Detecta si estás en local (.env.local) o en prod (.env)
const envFile = existsSync('.env.local') ? '.env.local' : '.env';
config({ path: envFile });

// Detecta si estás corriendo compilado (dist) o en src
const isCompiled = __dirname.includes('dist');

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [isCompiled ? join(__dirname, '../**/*.entity.js') : 'src/**/*.entity.ts'],
  migrations: [isCompiled ? join(__dirname, '../migrations/*.js') : 'src/migrations/*.ts'],
  synchronize: false,
  logging: ['error', 'warn', 'migration'],
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});
