import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Items } from "./items";

@Entity()
export class Constructed_Constructions {
    @PrimaryGeneratedColumn()
    constructionInventory_id!: number

    @Column()
    settlementID!: number

    @Column()
    amount!: number

    @Column()
    capacity_used!: number

    @Column()
    constructionID!: number

}
