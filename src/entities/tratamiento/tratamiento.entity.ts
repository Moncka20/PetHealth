import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DetalleFacturacionEntity } from '../detalle_facturacion/detalle_facturacion.entity';

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
}
