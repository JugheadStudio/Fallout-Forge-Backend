import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Settlements } from "./settlements";
import { Inventory } from "./inventory";

@Entity()
export class Trader {
    @PrimaryGeneratedColumn()
    trader_id!: number

    // @OneToOne(() => Settlements, (settlements) => settlements.settlement_id)
    @OneToOne(() => Settlements)
    @JoinColumn()
    settlements!: Settlements
    // @Column()
    // settlementID!: number

    @OneToMany(() => Inventory, (inventory) => inventory.inventory_id)
    InventoryID!: Inventory
    // @Column()
    // InventoryID!: number

}

