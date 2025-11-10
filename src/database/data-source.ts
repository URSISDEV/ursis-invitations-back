import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { existsSync } from 'fs';

const envFile = existsSync('.env.local') ? '.env.local' : '.env';
config({ path: envFile });

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
