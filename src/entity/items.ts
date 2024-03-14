import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Inventory } from "./inventory";
import { Constructions } from "./constructions";
import { Constructed_Constructions } from "./constructed_constructions";

@Entity()
export class Items {
  @PrimaryGeneratedColumn()
  item_id!: number;

  @Column()
  constructionID!: number;

  @Column()
  public constructedId!: number;

  @Column()
  public amount!: number;

//   @Column()
//   name!: string;

//   @Column()
//   value!: number;

//   @Column()
//   capacity!: number;

//   @Column()
//   image!: string;

  //   @Column()
  //   category!: string;

  @ManyToOne(
    () => Constructed_Constructions,
    (constructed) => constructed.constructed_ToCraftables
  )
  public constructed?: Constructed_Constructions;

  @ManyToOne(() => Constructions, (constructions) => constructions.items)
  public constructions?: Constructions;
}

