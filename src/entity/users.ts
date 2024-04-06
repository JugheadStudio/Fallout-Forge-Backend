import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'

@Entity("users")
export class User {
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
    isAdmin: boolean = false

    @BeforeInsert()
    async hashPassword(): Promise<void> {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }

    

}

