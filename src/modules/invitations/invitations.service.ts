import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Invitation } from './entities/invitation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomLoggerService } from '../../common/logger/logger.service';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private readonly invitationRepo: Repository<Invitation>,
    private readonly logger: CustomLoggerService,
  ) {}

  async findAll() {
    this.logger.log('Fetching all invitations', 'InvitationsService');
    const invitations = await this.invitationRepo.find();
    this.logger.log(`Retrieved ${invitations.length} invitations`, 'InvitationsService');
    return invitations;
  }

  async create(data: Partial<Invitation>) {
    this.logger.log(`Creating new invitation: ${data.title}`, 'InvitationsService');
    
    const invitation = this.invitationRepo.create(data);
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
}
