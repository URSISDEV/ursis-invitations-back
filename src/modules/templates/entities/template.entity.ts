import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EventType } from '../../event-types/entities/event-type.entity';

@Entity('templates')
export class Template {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string; // Nombre del template (ej: "XV Romántico", "Boda Elegante")

  @Column({ length: 255 })
  url: string; // Endpoint del front (ej: "/plantilla/xv", "/plantilla/boda")

  @Column({ length: 500 })
  imageUrl: string; // URL de la imagen de preview del template

  @Column({ type: 'uuid' })
  eventTypeId: string; // ID del tipo de evento

  @ManyToOne(() => EventType, eventType => eventType.templates)
  @JoinColumn({ name: 'eventTypeId' })
  eventType: EventType;

  @CreateDateColumn()
  createdAt: Date;
}
