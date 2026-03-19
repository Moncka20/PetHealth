import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class Client {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  document_id: string;

  @Column()
  address: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  registered_at: string;

  @Column({ nullable: true })
  notes: string;
}