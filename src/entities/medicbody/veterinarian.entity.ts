import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { specialty } from './specialty.entity';

@Entity()
export class veterinarian {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @ManyToOne(() => specialty, (s) => s.veterinarians, { eager: true })
  @JoinColumn({ name: 'specialty_id' })
  specialty: specialty;
}