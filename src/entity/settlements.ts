import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users";
import { Inventory } from "./inventory";

@Entity()
export class Settlements {
  @PrimaryGeneratedColumn()
  settlement_id!: number;

  @OneToMany(() => User, (user) => user.user_id)
  userID!: User;
  // @Column()
  // userID!: number

  @Column()
  name!: string;

  @Column()
  location!: string;

  @Column()
  level!: number;

  @Column()
  total_capacity!: number;

  @Column()
  bottleCaps!: number;

  @Column()
  image!: string;

  @OneToMany(() => Inventory, (inventory) => inventory.settlements)
  public settlements_ToStorage?: Inventory[];
}
