import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Template } from './entities/template.entity';
import { EventType } from '../event-types/entities/event-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomLoggerService } from '../../common/logger/logger.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepo: Repository<Template>,
    private readonly logger: CustomLoggerService,
  ) {}

  async findAll(): Promise<Template[]> {
    this.logger.log('Fetching all templates', 'TemplatesService');
    const templates = await this.templateRepo.find({
      relations: ['eventType'],
      order: { createdAt: 'DESC' },
    });
    this.logger.log(`Retrieved ${templates.length} templates`, 'TemplatesService');
    return templates;
  }

  async findByEventTypeId(eventTypeId: string): Promise<Template[]> {
    this.logger.log(`Fetching templates by event type ID: ${eventTypeId}`, 'TemplatesService');
    const templates = await this.templateRepo.find({
      where: { eventTypeId },
      relations: ['eventType'],
      order: { createdAt: 'DESC' },
    });
    this.logger.log(`Retrieved ${templates.length} templates for event type ID: ${eventTypeId}`, 'TemplatesService');
    return templates;
  }

  async findByEventTypeSlug(eventTypeSlug: string): Promise<Template[]> {
    this.logger.log(`Fetching templates by event type slug: ${eventTypeSlug}`, 'TemplatesService');
    const templates = await this.templateRepo.find({
      where: { 
        eventType: { slug: eventTypeSlug } 
      },
      relations: ['eventType'],
      order: { createdAt: 'DESC' },
    });
    this.logger.log(`Retrieved ${templates.length} templates for event type slug: ${eventTypeSlug}`, 'TemplatesService');
    return templates;
  }

  async findById(id: string): Promise<Template> {
    this.logger.log(`Fetching template by ID: ${id}`, 'TemplatesService');
    const template = await this.templateRepo.findOne({ 
      where: { id },
      relations: ['eventType']
    });
    
    if (!template) {
      this.logger.log(`Template not found with ID: ${id}`, 'TemplatesService');
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
    
    return template;
  }

  async create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    this.logger.log(`Creating new template: ${createTemplateDto.name}`, 'TemplatesService');
    
    const template = this.templateRepo.create(createTemplateDto);
    const savedTemplate = await this.templateRepo.save(template);
    
    this.logger.log(`Template created successfully: ${savedTemplate.name} (ID: ${savedTemplate.id})`, 'TemplatesService');
    
    return savedTemplate;
  }

  async update(id: string, updateTemplateDto: UpdateTemplateDto): Promise<Template> {
    this.logger.log(`Updating template with ID: ${id}`, 'TemplatesService');
    
    const template = await this.findById(id);
    Object.assign(template, updateTemplateDto);
    const updatedTemplate = await this.templateRepo.save(template);
    
    this.logger.log(`Template updated successfully: ${updatedTemplate.name} (ID: ${updatedTemplate.id})`, 'TemplatesService');
    
    return updatedTemplate;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing template with ID: ${id}`, 'TemplatesService');
    
    const template = await this.findById(id);
    await this.templateRepo.remove(template);
    
    this.logger.log(`Template removed successfully: ${template.name} (ID: ${id})`, 'TemplatesService');
  }
}
