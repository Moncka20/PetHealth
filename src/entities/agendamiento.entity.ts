import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Mascota } from './entities/mascota.entity';
import { Veterinario } from './entities/veterinario.entity';
import { Procedimiento } from './entities/procedimiento.entity';

@Entity('agendamientos')
export class Agendamiento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  fecha_hora: Date;

  @Column({ type: 'enum', enum: ['programada', 'completada', 'cancelada'], default: 'programada' })
  estado: string;

  @ManyToOne(() => Mascota, { eager: true, nullable: false })
  @JoinColumn({ name: 'mascota_id' })
  mascota: Mascota;

  @ManyToOne(() => Veterinario, { eager: true, nullable: false })
  @JoinColumn({ name: 'veterinario_id' })
  veterinario: Veterinario;

  @OneToMany(() => Procedimiento, (p) => p.agendamiento, { eager: true })
  procedimientos: Procedimiento[];
}