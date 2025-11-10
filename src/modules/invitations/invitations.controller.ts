import { Controller, Get, Post, Body } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { Invitation } from './entities/invitation.entity';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Get()
  getAll(): Promise<Invitation[]> {
    return this.invitationsService.findAll();
  }

  @Post()
  create(@Body() data: Partial<Invitation>) {
    return this.invitationsService.create(data);
  }
}
