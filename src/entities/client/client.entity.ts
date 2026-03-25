import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";


@Entity()
export class Client {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name'})
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'document_id', unique: true })
  documentId: string;

  @Column({ name: 'address' })
  address: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'phone', nullable: true })
  phone: string;

  @CreateDateColumn({ name: 'registered_at' })
  registeredAt: Date;

  @Column({ name: 'notes', nullable: true })
  notes: string;
}