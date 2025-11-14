import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('user_whitelist')
export class UserWhitelist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ type: 'text' })
  interestReason: string; // Razón por la cual quiere estar en la whitelist / qué invitación le interesaría crear

  @Column({ default: false })
  isEventOrganizer: boolean; // Si es organizador de eventos

  @CreateDateColumn()
  createdAt: Date;
}
