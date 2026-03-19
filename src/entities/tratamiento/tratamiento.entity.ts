import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne, JoinColumn } from 'typeorm';
import { Agendamiento } from '../agendamiento/agendamiento.entity';

export enum TipoTratamiento {
  VACUNA = 'vacuna',
  EXAMEN = 'examen',
  LIMPIEZA = 'limpieza',
  OPERACION = 'operacion',
}

@Entity('tratamiento')
export class TratamientoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  nombre: string;

  @Column({ type: 'enum', enum: TipoTratamiento })
  tipo: TipoTratamiento;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @ManyToOne(() => Agendamiento, (a) => a.procedimientos, { nullable: true })
  @JoinColumn({ name: 'agendamiento_id' })
  agendamiento: Agendamiento;
}
