import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Invitation } from './entities/invitation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation)
    private readonly invitationRepo: Repository<Invitation>,
  ) {}

  findAll() {
    return this.invitationRepo.find();
  }

  create(data: Partial<Invitation>) {
    const invitation = this.invitationRepo.create(data);
    return this.invitationRepo.save(invitation);
  }
}
