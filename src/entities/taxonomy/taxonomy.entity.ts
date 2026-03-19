import { Column, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

export class Taxonomy {

    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    // Si es padre
    @ManyToOne( () => Taxonomy, (taxonomy) => taxonomy.children, { nullable: true })
    parent: Taxonomy;

    // Si es hijo
    @OneToMany( () => Taxonomy, (taxonomy) => taxonomy.parent )
    children: Taxonomy;
}