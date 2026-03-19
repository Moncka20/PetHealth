// src/entities/species.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Breed } from './breed.entity';

@Entity()
export class Species {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Breed, breed => breed.species)
  breeds: Breed[];
}