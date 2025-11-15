import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EventType } from './entities/event-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomLoggerService } from '../../common/logger/logger.service';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';

@Injectable()
export class EventTypesService {
  constructor(
    @InjectRepository(EventType)
    private readonly eventTypeRepo: Repository<EventType>,
    private readonly logger: CustomLoggerService,
  ) {}

  async findAll(): Promise<EventType[]> {
    this.logger.log('Fetching all event types', 'EventTypesService');
    const eventTypes = await this.eventTypeRepo.find({
      order: { name: 'ASC' },
    });
    this.logger.log(`Retrieved ${eventTypes.length} event types`, 'EventTypesService');
    return eventTypes;
  }

  async findActive(): Promise<EventType[]> {
    this.logger.log('Fetching active event types', 'EventTypesService');
    const eventTypes = await this.eventTypeRepo.find({
      where: { isActive: true },
      order: { name: 'ASC' },
    });
    this.logger.log(`Retrieved ${eventTypes.length} active event types`, 'EventTypesService');
    return eventTypes;
  }

  async findById(id: string): Promise<EventType> {
    this.logger.log(`Fetching event type by ID: ${id}`, 'EventTypesService');
    const eventType = await this.eventTypeRepo.findOne({ 
      where: { id },
      relations: ['templates']
    });
    
    if (!eventType) {
      this.logger.log(`Event type not found with ID: ${id}`, 'EventTypesService');
      throw new NotFoundException(`Event type with ID ${id} not found`);
    }
    
    return eventType;
  }

  async findBySlug(slug: string): Promise<EventType> {
    this.logger.log(`Fetching event type by slug: ${slug}`, 'EventTypesService');
    const eventType = await this.eventTypeRepo.findOne({ 
      where: { slug },
      relations: ['templates']
    });
    
    if (!eventType) {
      this.logger.log(`Event type not found with slug: ${slug}`, 'EventTypesService');
      throw new NotFoundException(`Event type with slug ${slug} not found`);
    }
    
    return eventType;
  }

  async create(createEventTypeDto: CreateEventTypeDto): Promise<EventType> {
    this.logger.log(`Creating new event type: ${createEventTypeDto.name}`, 'EventTypesService');
    
    // Verificar que el slug no exista
    const existingEventType = await this.eventTypeRepo.findOne({ 
      where: { slug: createEventTypeDto.slug } 
    });
    
    if (existingEventType) {
      this.logger.log(`Slug already exists: ${createEventTypeDto.slug}`, 'EventTypesService');
      throw new ConflictException(`Event type with slug ${createEventTypeDto.slug} already exists`);
    }
    
    const eventType = this.eventTypeRepo.create(createEventTypeDto);
    const savedEventType = await this.eventTypeRepo.save(eventType);
    
    this.logger.log(`Event type created successfully: ${savedEventType.name} (ID: ${savedEventType.id})`, 'EventTypesService');
    
    return savedEventType;
  }

  async update(id: string, updateEventTypeDto: UpdateEventTypeDto): Promise<EventType> {
    this.logger.log(`Updating event type with ID: ${id}`, 'EventTypesService');
    
    const eventType = await this.findById(id);
    
    // Si se está actualizando el slug, verificar que no exista
    if (updateEventTypeDto.slug && updateEventTypeDto.slug !== eventType.slug) {
      const existingEventType = await this.eventTypeRepo.findOne({ 
        where: { slug: updateEventTypeDto.slug } 
      });
      
      if (existingEventType) {
        this.logger.log(`Slug already exists: ${updateEventTypeDto.slug}`, 'EventTypesService');
        throw new ConflictException(`Event type with slug ${updateEventTypeDto.slug} already exists`);
      }
    }
    
    Object.assign(eventType, updateEventTypeDto);
    const updatedEventType = await this.eventTypeRepo.save(eventType);
    
    this.logger.log(`Event type updated successfully: ${updatedEventType.name} (ID: ${updatedEventType.id})`, 'EventTypesService');
    
    return updatedEventType;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing event type with ID: ${id}`, 'EventTypesService');
    
    const eventType = await this.findById(id);
    
    // Verificar si tiene templates asociados
    if (eventType.templates && eventType.templates.length > 0) {
      this.logger.log(`Cannot delete event type with associated templates: ${id}`, 'EventTypesService');
      throw new ConflictException(`Cannot delete event type with ${eventType.templates.length} associated templates`);
    }
    
    await this.eventTypeRepo.remove(eventType);
    
    this.logger.log(`Event type removed successfully: ${eventType.name} (ID: ${id})`, 'EventTypesService');
  }
}
