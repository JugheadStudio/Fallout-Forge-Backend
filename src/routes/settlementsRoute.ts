import Express from "express";
import AppDataSource from "../dataSource";
import { Settlements } from "../entity/settlements";

const settlementsRouter = Express.Router();

settlementsRouter.use(Express.json());

const appDataSource = AppDataSource;

settlementsRouter.get("/", async (req, res) => {
  try {
    const settlements = await appDataSource
      .getRepository(Settlements)
      .createQueryBuilder("settlements")
      .leftJoinAndSelect("settlements.settlements_ToStorage", "inventory")
      .leftJoinAndSelect("inventory.cc", "constructed_constructions")
      .orderBy("settlements.settlement_id", "ASC")
      .getMany();

    res.json(settlements);
  } catch (error) {
    console.log("something went wrong");
    return res.status(500).json({ message: error });
  }
});


export default settlementsRouter;
