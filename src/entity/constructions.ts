import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Items } from "./items";
import { Constructed_Constructions } from "./constructed_constructions";

@Entity()
export class Constructions {

    @OneToMany(() => Constructed_Constructions, (constructed_constructions) => constructed_constructions.constructions)
    @PrimaryGeneratedColumn()
    constructions_id!: Constructed_Constructions
    // @PrimaryGeneratedColumn()
    // constructions_id!: number

    @OneToMany(() => Items, (items) => items.items_required)
    items!: Items[]
    // @Column("int", { array: true })
    // items_required!: number[]

    @Column()
    name!: string

    @Column()
    amountOwned!: number

    @Column()
    image!: string

    @Column()
    category!: string

}

