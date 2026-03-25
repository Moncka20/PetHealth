import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Pet } from '../pet.entity/pet.entity';
import { veterinarian } from '../medicbody/veterinarian.entity';

@Entity('agendamientos')
export class Agendamiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  fecha_hora: Date;

  @Column({ type: 'enum', enum: ['programada', 'completada', 'cancelada'], default: 'programada' })
  estado: string;

  @ManyToOne(() => Pet, { eager: true, nullable: false })
  @JoinColumn({ name: 'mascota_id' })
  mascota: Pet;

  @ManyToOne(() => veterinarian, { eager: true, nullable: false })
  @JoinColumn({ name: 'veterinario_id' })
  veterinario: veterinarian;

}