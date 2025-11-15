import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  HttpCode, 
  HttpStatus 
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { EventTypesService } from './event-types.service';
import { EventType } from './entities/event-type.entity';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';

@Controller('event-types')
export class EventTypesController {
  constructor(private readonly eventTypesService: EventTypesService) {}

  @Get()
  @SkipThrottle() // Sin límite - endpoint público para mostrar tipos de evento
  findAll(): Promise<EventType[]> {
    return this.eventTypesService.findAll();
  }

  @Get('active')
  @SkipThrottle() // Sin límite - endpoint público para tipos activos
  findActive(): Promise<EventType[]> {
    return this.eventTypesService.findActive();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<EventType> {
    return this.eventTypesService.findById(id);
  }

  @Get('slug/:slug')
  @SkipThrottle() // Sin límite - endpoint público para buscar por slug
  findBySlug(@Param('slug') slug: string): Promise<EventType> {
    return this.eventTypesService.findBySlug(slug);
  }

  @Post()
  create(@Body() createEventTypeDto: CreateEventTypeDto): Promise<EventType> {
    return this.eventTypesService.create(createEventTypeDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEventTypeDto: UpdateEventTypeDto
  ): Promise<EventType> {
    return this.eventTypesService.update(id, updateEventTypeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.eventTypesService.remove(id);
  }
}
