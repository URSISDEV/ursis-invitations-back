import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Template } from '../../templates/entities/template.entity';

@Entity('event_types')
export class EventType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string; // Nombre del tipo de evento (ej: "XV Años", "Boda", "Cumpleaños")

  @Column({ length: 50, unique: true })
  slug: string; // Slug único para URLs (ej: "xv", "boda", "cumpleanos")

  @Column({ length: 255, nullable: true })
  description: string; // Descripción del tipo de evento

  @Column({ default: true })
  isActive: boolean; // Si el tipo de evento está activo

  @OneToMany(() => Template, template => template.eventType)
  templates: Template[];

  @CreateDateColumn()
  createdAt: Date;
}
