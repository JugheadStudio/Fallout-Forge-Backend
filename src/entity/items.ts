import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Inventory } from "./inventory";
import { Constructions } from "./constructions";

@Entity()
export class Items {

    //two relations here, HOW????
    // missing relation to Inventory table
    @OneToMany(() => Constructions, (constructions) => constructions.items)
    @PrimaryGeneratedColumn()
    items_required!: Constructions
    // @PrimaryGeneratedColumn()
    // item_id!: number

    @Column()
    name!: string

    @Column()
    value!: number

    @Column()
    capacity!: number

    @Column()
    image!: string

    @Column()
    category!: string

}

