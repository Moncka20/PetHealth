import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('especiality')
export class EspecialityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costoBase: number;
}
