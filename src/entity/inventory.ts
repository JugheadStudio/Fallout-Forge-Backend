import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Items } from "./items";
import { Settlements } from "./settlements";

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn()
    inventory_id!: number

    // @OneToOne(() => Settlements, (settlements) => settlements.settlement_id)
    @OneToOne(() => Settlements)
    @JoinColumn()
    settlements!: Settlements
    // @Column()
    // settlementID!: number

    @Column()
    amount!: number

    @Column()
    capacity_used!: number

    @OneToOne(() => Items)
    @JoinColumn()
    items!: Items

}
