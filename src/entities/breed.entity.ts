// src/entities/breed.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Species } from './species.entity';

@Entity()
export class Breed {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Species, species => species.breeds, { eager: true })
  species: Species;
}