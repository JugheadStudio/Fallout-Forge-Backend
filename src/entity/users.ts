import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    user_id!: number

    @Column()
    name!: string

    @Column()
    surname!: string

    @Column()
    username!: string

    @Column()
    email!: string

    @Column()
    password!: string

    @Column()
    role!: string

}

