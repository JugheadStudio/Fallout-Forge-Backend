import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Settlements {
    @PrimaryGeneratedColumn()
    settlement_id!: number

    @Column()
    userID!: number

    @Column()
    name!: string

    @Column()
    location!: string

    @Column()
    level!: number

    @Column()
    total_capacity!: number

    @Column()
    bottleCaps!: number

    @Column()
    image!: string

}

