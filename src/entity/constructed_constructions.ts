import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Items } from "./items";
import { Constructions } from "./constructions";
import { Settlements } from "./settlements";

@Entity()
export class Constructed_Constructions {
    @PrimaryGeneratedColumn()
    constructionInventory_id!: number

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

    @OneToOne(() => Constructions)
    @JoinColumn()
    constructions!: Constructions
    // @Column()
    // constructionID!: number

}
