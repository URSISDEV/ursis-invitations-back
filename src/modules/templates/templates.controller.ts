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
import { TemplatesService } from './templates.service';
import { Template } from './entities/template.entity';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  @SkipThrottle() // Sin límite - endpoint público para mostrar templates
  findAll(): Promise<Template[]> {
    return this.templatesService.findAll();
  }

  @Get('event-type-id/:eventTypeId')
  @SkipThrottle() // Sin límite - endpoint público para filtrar por ID de tipo
  findByEventTypeId(@Param('eventTypeId') eventTypeId: string): Promise<Template[]> {
    return this.templatesService.findByEventTypeId(eventTypeId);
  }

  @Get('event-type/:eventTypeSlug')
  @SkipThrottle() // Sin límite - endpoint público para filtrar por slug de tipo
  findByEventTypeSlug(@Param('eventTypeSlug') eventTypeSlug: string): Promise<Template[]> {
    return this.templatesService.findByEventTypeSlug(eventTypeSlug);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Template> {
    return this.templatesService.findById(id);
  }

  @Post()
  create(@Body() createTemplateDto: CreateTemplateDto): Promise<Template> {
    return this.templatesService.create(createTemplateDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTemplateDto: UpdateTemplateDto
  ): Promise<Template> {
    return this.templatesService.update(id, updateTemplateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.templatesService.remove(id);
  }
}
