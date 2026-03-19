import { EstadoFactura, MetodoPago } from '../../dtos/facturacion/create-facturacion.dto';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('facturacion')
export class facturacionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  idConsulta: number;

  @Column({ type: 'date' })
  fechaEmision: string;

  @Column({ type: 'date', nullable: true })
  fechaVencimiento?: string;

  @Column({ type: 'enum', enum: MetodoPago })
  metodoPago: MetodoPago;

  @Column({ type: 'enum', enum: EstadoFactura, default: EstadoFactura.PENDIENTE })
  estado: EstadoFactura;

  @Column({ type: 'varchar', length: 255, nullable: true })
  observaciones?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: string;
}
