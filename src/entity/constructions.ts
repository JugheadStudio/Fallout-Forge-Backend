import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Items } from "./items";
import { Constructed_Constructions } from "./constructed_constructions";

@Entity()
export class Constructions {
  @PrimaryGeneratedColumn()
  constructions_id!: number;

  @Column()
  name!: string;

  @Column()
  amountOwned!: number

  @Column()
  image!: string;

  @Column()
  category!: string;

  @OneToMany(() => Items, (items) => items.constructions)
  items?: Items[];
  // @Column("int", { array: true })
  // items_required!: number[]
}
