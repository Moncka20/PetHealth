import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { Client } from '../client/client.entity';
import { Taxonomy } from '../taxonomy/taxonomy.entity';

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

  // ✅ relación con Client
  @ManyToOne(() => Client, (client) => client.pets, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  // ✅ relación con Taxonomy
  @ManyToOne(() => Taxonomy, (taxonomy) => taxonomy.pets, {
    nullable: false,
  })
  @JoinColumn({ name: 'taxonomy_id' })
  taxonomy: Taxonomy;
}