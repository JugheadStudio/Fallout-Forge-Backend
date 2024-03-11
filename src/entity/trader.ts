import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Trader {
    @PrimaryGeneratedColumn()
    trader_id!: number

    @Column()
    settlementID!: number

    @Column()
    InventoryID!: number

}

