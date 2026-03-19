import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Owner } from './owner.entity';
import { Breed } from './breed.entity';

@Entity('pets')
export class Pet {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  birth_date: Date;

  // relación con owner
  @ManyToOne(() => Owner, (owner) => owner.pets, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'owner_id' })
  owner: Owner;

  // relación con breed
  @ManyToOne(() => Breed, (breed) => breed.pets, {
    nullable: false,
  })
  @JoinColumn({ name: 'breed_id' })
  breed: Breed;
}