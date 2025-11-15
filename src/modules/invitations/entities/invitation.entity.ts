import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('invitations')
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  templateId: string; // ej: "xv-romantic", "boda-elegante"

  @Column({ unique: true })
  slug: string; // ej: "xv-santino"

  @Column({ length: 150 })
  title: string;

  @Column({ type: 'date', nullable: true })
  eventDate: Date; // 📅 fecha del evento

  @Column({ type: 'time', nullable: true })
  eventTime: string; // ⏰ hora del evento (ej. "19:30")

  @Column({ length: 100, nullable: true })
  eventType: string; // 🎉 tipo de evento (Casamiento, Cumpleaños, etc.)

  @Column({ type: 'jsonb', nullable: true })
  sectionsUsed: any; // qué versión de cada sección usar: { "hero": "hero_v2", "details": "details_v1" }

  @Column({ type: 'jsonb', nullable: true })
  sectionsOrder: string[]; // orden de renderizado: ["hero_v2", "details_v1", "gallery_v1", "rsvp_basic"]

  @Column({ type: 'jsonb', nullable: true })
  sectionsData: any; // datos de cada sección: { "hero": {...}, "details": {...} }

  @Column({ default: false })
  isPublic: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
