import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { facturacionEntity } from '../facturacion/facturacion.entity';
import { TratamientoEntity } from '../tratamiento/tratamiento.entity';

@Entity('detalle_facturacion')
export class DetalleFacturacionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => facturacionEntity, (factura) => factura.id, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  idFactura: number;

  @ManyToOne(() => TratamientoEntity, (tratamiento) => tratamiento.id, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  idTratamiento: number;

  @Column({ type: 'varchar', length: 200 })
  concepto: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;
}
