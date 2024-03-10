import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Inventory } from "./inventory";

@Entity()
export class Items {
    @PrimaryGeneratedColumn()
    item_id!: number

    @OneToMany(() => Inventory, (inventory) => inventory.inventory_id)
    @JoinColumn()
    inventoryID: Inventory
    // @Column()
    // inventoryID!: number

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

