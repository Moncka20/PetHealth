import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TipoTratamiento {
  VACUNA = 'vacuna',
  EXAMEN = 'examen',
  LIMPIEZA = 'limpieza',
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
}
