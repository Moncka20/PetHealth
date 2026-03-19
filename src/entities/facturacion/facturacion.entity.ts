import { EstadoFactura, MetodoPago } from '../../dtos/facturacion/create-facturacion.dto';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { specialty } from '../medicbody/specialty.entity';
import { Agendamiento } from '../agendamiento/agendamiento.entity';

@Entity('facturacion')
export class facturacionEntity {
  @PrimaryGeneratedColumn()
  id: number;

    @ManyToOne(() => Agendamiento, (Agendamiento) => Agendamiento.id, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  idConsulta: number;

    @ManyToOne(() => specialty, (especiality) => especiality.id, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  idEspecialidad?: number;

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
