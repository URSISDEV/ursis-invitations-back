import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { existsSync } from 'fs';

const envFile = existsSync('.env.local') ? '.env.local' : '.env';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: envFile }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: false,
        migrationsRun: true,
        migrations: ['dist/migrations/*.js'],
        ssl: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
