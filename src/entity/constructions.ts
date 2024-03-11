import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Constructions {
    @PrimaryGeneratedColumn()
    constructions_id!: number

    // @OneToMany(() => Items)
    // @JoinColumn()
    // items: Items
    @Column("int", { array: true })
    items_required!: number[]

    @Column()
    name!: string

    @Column()
    amountOwned!: number

    @Column()
    image!: string

    @Column()
    category!: string

}

