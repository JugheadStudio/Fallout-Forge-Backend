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

@Entity()
export class Constructed_Constructions {
  @PrimaryGeneratedColumn()
  constructionInventory_id!: number;

  // @OneToOne(() => Settlements)
  // @JoinColumn()
  // settlements!: Settlements
  // @Column()
  // settlementID!: number

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
  capacity_used!: number;

  // @OneToOne(() => Constructions)
  // @JoinColumn()
  // constructions!: Constructions
  // @Column()
  // constructionID!: number

  @OneToMany(() => Items, (items) => items.constructed)
  public constructed_ToCraftables?: Items[];
}
