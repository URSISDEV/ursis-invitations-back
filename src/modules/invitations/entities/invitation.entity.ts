import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('invitations')
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 150 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 100, nullable: true })
  eventType: string; // 🎉 tipo de evento (Casamiento, Cumpleaños, etc.)

  @Column({ type: 'date', nullable: true })
  eventDate: Date; // 📅 fecha del evento

  @Column({ type: 'time', nullable: true })
  eventTime: string; // ⏰ hora del evento (ej. "19:30")

  @Column({ default: false })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
