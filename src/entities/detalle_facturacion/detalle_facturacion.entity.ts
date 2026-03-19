import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { facturacionEntity } from '../facturacion/facturacion.entity';
import { TratamientoEntity } from '../tratamiento/tratamiento.entity';
import { Agendamiento } from "../agendamiento/agendamiento.entity"

@Entity('detalle_facturacion')
export class DetalleFacturacionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  idFactura?: number;

    @ManyToOne(() => Agendamiento, (consulta) => consulta.id, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @Column({ type: 'int' })
  idConsulta: number;

  @ManyToOne(() => TratamientoEntity, (tratamiento) => tratamiento.id, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @Column({ type: 'int' })
  idTratamiento: number;

  @Column({ type: 'varchar', length: 200 })
  concepto: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  factura?: facturacionEntity;

  tratamiento: TratamientoEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;
}
