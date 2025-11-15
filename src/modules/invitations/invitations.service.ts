import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Invitation } from './entities/invitation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomLoggerService } from '../../common/logger/logger.service';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private readonly invitationRepo: Repository<Invitation>,
    private readonly logger: CustomLoggerService,
  ) {}

  async findAll(): Promise<Invitation[]> {
    this.logger.log('Fetching all invitations', 'InvitationsService');
    const invitations = await this.invitationRepo.find();
    this.logger.log(`Retrieved ${invitations.length} invitations`, 'InvitationsService');
    return invitations;
  }

  async findById(id: string): Promise<Invitation> {
    this.logger.log(`Fetching invitation by ID: ${id}`, 'InvitationsService');
    const invitation = await this.invitationRepo.findOne({ where: { id } });
    
    if (!invitation) {
      this.logger.log(`Invitation not found with ID: ${id}`, 'InvitationsService');
      throw new NotFoundException(`Invitation with ID ${id} not found`);
    }
    
    return invitation;
  }

  async findBySlug(slug: string): Promise<Invitation> {
    this.logger.log(`Fetching invitation by slug: ${slug}`, 'InvitationsService');
    const invitation = await this.invitationRepo.findOne({ where: { slug } });
    
    if (!invitation) {
      this.logger.log(`Invitation not found with slug: ${slug}`, 'InvitationsService');
      throw new NotFoundException(`Invitation with slug ${slug} not found`);
    }
    
    return invitation;
  }

  async findPublicBySlug(slug: string): Promise<Invitation> {
    this.logger.log(`Fetching public invitation by slug: ${slug}`, 'InvitationsService');
    const invitation = await this.invitationRepo.findOne({ 
      where: { slug, isPublic: true } 
    });
    
    if (!invitation) {
      this.logger.log(`Public invitation not found with slug: ${slug}`, 'InvitationsService');
      throw new NotFoundException(`Public invitation with slug ${slug} not found`);
    }
    
    return invitation;
  }

  async create(createInvitationDto: CreateInvitationDto): Promise<Invitation> {
    this.logger.log(`Creating new invitation: ${createInvitationDto.title}`, 'InvitationsService');
    
    // Verificar que el slug no exista
    const existingInvitation = await this.invitationRepo.findOne({ 
      where: { slug: createInvitationDto.slug } 
    });
    
    if (existingInvitation) {
      this.logger.log(`Slug already exists: ${createInvitationDto.slug}`, 'InvitationsService');
      throw new ConflictException(`Invitation with slug ${createInvitationDto.slug} already exists`);
    }
    
    const invitation = this.invitationRepo.create(createInvitationDto);
    const savedInvitation = await this.invitationRepo.save(invitation);
    
    // Log específico para creación de invitación
    this.logger.logInvitationCreated({
      title: savedInvitation.title,
      eventType: savedInvitation.eventType || 'Unknown',
      isPublic: savedInvitation.isPublic
    });
    
    this.logger.log(`Invitation created successfully: ${savedInvitation.title} (ID: ${savedInvitation.id})`, 'InvitationsService');
    
    return savedInvitation;
  }

  async update(id: string, updateInvitationDto: UpdateInvitationDto): Promise<Invitation> {
    this.logger.log(`Updating invitation with ID: ${id}`, 'InvitationsService');
    
    const invitation = await this.findById(id);
    
    // Si se está actualizando el slug, verificar que no exista
    if (updateInvitationDto.slug && updateInvitationDto.slug !== invitation.slug) {
      const existingInvitation = await this.invitationRepo.findOne({ 
        where: { slug: updateInvitationDto.slug } 
      });
      
      if (existingInvitation) {
        this.logger.log(`Slug already exists: ${updateInvitationDto.slug}`, 'InvitationsService');
        throw new ConflictException(`Invitation with slug ${updateInvitationDto.slug} already exists`);
      }
    }
    
    Object.assign(invitation, updateInvitationDto);
    const updatedInvitation = await this.invitationRepo.save(invitation);
    
    this.logger.log(`Invitation updated successfully: ${updatedInvitation.title} (ID: ${updatedInvitation.id})`, 'InvitationsService');
    
    return updatedInvitation;
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing invitation with ID: ${id}`, 'InvitationsService');
    
    const invitation = await this.findById(id);
    await this.invitationRepo.remove(invitation);
    
    this.logger.log(`Invitation removed successfully: ${invitation.title} (ID: ${id})`, 'InvitationsService');
  }

  async togglePublic(id: string): Promise<Invitation> {
    this.logger.log(`Toggling public status for invitation with ID: ${id}`, 'InvitationsService');
    
    const invitation = await this.findById(id);
    invitation.isPublic = !invitation.isPublic;
    
    const updatedInvitation = await this.invitationRepo.save(invitation);
    
    this.logger.log(`Invitation public status toggled: ${updatedInvitation.title} (ID: ${id}) - isPublic: ${updatedInvitation.isPublic}`, 'InvitationsService');
    
    return updatedInvitation;
  }
}
