import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('detalle_facturacion')
export class DetalleFacturacionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  idConsulta: number;

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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: string;
}
