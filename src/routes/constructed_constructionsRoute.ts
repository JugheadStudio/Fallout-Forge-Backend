import Express from "express";
import AppDataSource from "../dataSource";
import { Constructed_Constructions } from "../entity/constructed_constructions";

const ccRouter = Express.Router();

ccRouter.use(Express.json());

const appDataSource = AppDataSource;

// GET request to fetch all CC items
ccRouter.get("/", async (req, res) => {
  try {
    // console.log("called")
    const cc = await appDataSource
      .getRepository(Constructed_Constructions)
      .find({
        order: {
          ccMaterials_id: "ASC", // or "DESC" for descending order
        },
      });

    res.json(cc);
  } catch (error) {
    console.error("Error fetching cc  items", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST request to save CC item
ccRouter.put("/:ccMaterials_id", async (req, res) => {
  try {
    const ccMaterials_id = parseInt(req.params.ccMaterials_id);

    const { buy_price, sell_price } = req.body;

    const ccItem = await appDataSource
      .getRepository(Constructed_Constructions)
      .findOneBy({ ccMaterials_id: ccMaterials_id });

    if (!ccItem) {
      res.status(404).json({ message: "No item found" });
    } else {
      ccItem!.buy_price = buy_price;
      ccItem!.sell_price = sell_price;

      const updatedItem = await appDataSource
        .getRepository(Constructed_Constructions)
        .save(ccItem!);

      res.json(updatedItem);
    }
  } catch (error) {
    console.error("Error updating inventory  items", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default ccRouter;
