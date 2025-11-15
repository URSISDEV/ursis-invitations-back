import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Patch,
  Body, 
  Param, 
  HttpCode, 
  HttpStatus 
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { InvitationsService } from './invitations.service';
import { Invitation } from './entities/invitation.entity';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';

@Controller('invitations')
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Get()
  findAll(): Promise<Invitation[]> {
    return this.invitationsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Invitation> {
    return this.invitationsService.findById(id);
  }

  @Get('slug/:slug')
  @SkipThrottle() // Sin límite - la gente necesita ver las invitaciones
  findBySlug(@Param('slug') slug: string): Promise<Invitation> {
    return this.invitationsService.findBySlug(slug);
  }

  @Get('public/:slug')
  @SkipThrottle() // Sin límite - endpoint público principal
  findPublicBySlug(@Param('slug') slug: string): Promise<Invitation> {
    return this.invitationsService.findPublicBySlug(slug);
  }

  @Post()
  create(@Body() createInvitationDto: CreateInvitationDto): Promise<Invitation> {
    return this.invitationsService.create(createInvitationDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvitationDto: UpdateInvitationDto
  ): Promise<Invitation> {
    return this.invitationsService.update(id, updateInvitationDto);
  }

  @Patch(':id/toggle-public')
  togglePublic(@Param('id') id: string): Promise<Invitation> {
    return this.invitationsService.togglePublic(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.invitationsService.remove(id);
  }
}
