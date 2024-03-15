import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Items } from "./items";
import { Settlements } from "./settlements";
import { Constructed_Constructions } from "./constructed_constructions";

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  inventory_id!: number;

  @Column()
  amount!: number;

  @Column()
  capacity_used!: number;

  @ManyToOne(
    () => Settlements,
    (settlements) => settlements.settlements_ToStorage
  )
  public settlements?: Settlements;

  @ManyToOne(() => Constructed_Constructions, (cc) => cc.cc_ToStorage)
  public cc?: Constructed_Constructions;
}
