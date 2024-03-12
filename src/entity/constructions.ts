import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Items } from "./items";

@Entity()
export class Constructions {
    @PrimaryGeneratedColumn()
    constructions_id!: number

    @OneToMany(() => Items, (items) => items.item_id)
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

