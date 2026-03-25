import { Entity, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Taxonomy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => Taxonomy, (taxonomy) => taxonomy.children, { nullable: true })
    parent: Taxonomy;

    @OneToMany(() => Taxonomy, (taxonomy) => taxonomy.parent)
    children: Taxonomy[];  // ← array, no Taxonomy solo
}