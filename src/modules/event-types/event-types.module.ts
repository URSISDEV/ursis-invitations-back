import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventType } from './entities/event-type.entity';
import { EventTypesService } from './event-types.service';
import { EventTypesController } from './event-types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EventType])],
  providers: [EventTypesService],
  controllers: [EventTypesController],
  exports: [EventTypesService],
})
export class EventTypesModule {}
