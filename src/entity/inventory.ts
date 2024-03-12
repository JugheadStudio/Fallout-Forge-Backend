import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Items } from "./items";

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn()
    inventory_id!: number

    @Column()
    settlementID!: number

    @Column()
    amount!: number

    @Column()
    capacity_used!: number

    @ManyToOne(() => Items, (items) => items.item_id)
    items!: Items

}
