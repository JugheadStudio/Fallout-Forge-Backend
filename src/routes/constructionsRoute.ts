import Express from "express";
import AppDataSource from "../dataSource";
import { Constructions } from "../entity/constructions";

const constructionsRouter = Express.Router();

constructionsRouter.use(Express.json());

const appDataSource = AppDataSource;

constructionsRouter.get("/", async (req, res) => {
  try {
    const constructionss = await appDataSource
      .getRepository(Constructions)
      .createQueryBuilder("constructions")
      .leftJoinAndSelect("constructions.items", "items") // add the ingreients table
      .leftJoinAndSelect("items.constructed", "constructed") // add the inventory table to ingredients
      .getMany();

    res.json(constructionss);
  } catch (error) {
    console.log("something went wrong");
    return res.status(500).json({ message: error });
  }
});

export default constructionsRouter;
