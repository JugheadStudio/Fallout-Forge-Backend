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
  amountOwned!: number;

  @Column()
  image!: string;

  @Column()
  category!: string;

  @OneToMany(() => Items, (items) => items.constructions)
  items?: Items[];

  @Column({ type: "varchar", nullable: true }) // Specify data type as integer and allow null values
  yields!: string;

  @Column({ type: "integer", nullable: true }) // Specify data type as integer and allow null values
  cost?: number;

  @Column({ type: "integer", nullable: true }) // Specify data type as integer and allow null values
  amountOwnedSettlement1?: number;

  @Column({ type: "integer", nullable: true }) // Specify data type as integer and allow null values
  amountOwnedSettlement2?: number;

  @Column({ type: "integer", nullable: true }) // Specify data type as integer and allow null values
  amountOwnedSettlement3?: number;
}
