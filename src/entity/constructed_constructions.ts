import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Items } from "./items";
import { Constructions } from "./constructions";
import { Settlements } from "./settlements";
import { Inventory } from "./inventory";

@Entity()
export class Constructed_Constructions {
  @PrimaryGeneratedColumn()
  ccMaterials_id!: number;

  @Column()
  name!: string;

  @Column()
  category!: string;

  @Column()
  icon!: string;

  @Column()
  description!: string;

  @Column()
  amount!: number;

  @Column()
  buy_price!: number;

  @Column()
  sell_price!: number;

  @Column()
  capacity_used!: number;

  @OneToMany(() => Items, (items) => items.constructed)
  public constructed_ToCraftables?: Items[];

  @OneToMany(() => Inventory, (inventory) => inventory.cc)
  public cc_ToStorage?: Inventory[];
}
