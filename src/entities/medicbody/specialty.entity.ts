import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { veterinarian } from './veterinarian.entity';

@Entity()
export class specialty {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  base_cost: number;

  @OneToMany(() => veterinarian, (v) => v.specialty)
  veterinarians: veterinarian[];
}