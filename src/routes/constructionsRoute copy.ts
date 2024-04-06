import Express from "express";
import AppDataSource from "../dataSource";
import { Constructions } from "../entity/constructions";
import { Settlements } from "../entity/settlements";
import { Constructed_Constructions } from "../entity/constructed_constructions";

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

constructionsRouter.post("/:settlementId/craft", async (req, res) => {
  const { settlementId } = req.params;
  const { constructionId } = req.body;

  try {
    // Parse settlementId to integer
    const parsedSettlementId = parseInt(settlementId);

    // Check if parsedSettlementId is a valid number
    if (isNaN(parsedSettlementId)) {
      return res.status(400).json({ message: "Invalid settlement ID." });
    }

    // Find the settlement
    const settlement = await appDataSource
      .getRepository(Settlements)
      .findOne({ where: { settlement_id: parsedSettlementId } });

    // Check if settlement exists
    if (!settlement) {
      return res.status(404).json({ message: "Settlement not found." });
    }

    const construction = await appDataSource
      .getRepository(Constructions)
      .findOneOrFail(constructionId);

    if (!construction.cost) {
      return res
        .status(400)
        .json({ message: "Construction cost is not defined." });
    }

    // Check if settlement has enough bottleCaps
    if (settlement.bottleCaps < construction.cost) {
      return res.status(400).json({ message: "Not enough bottle caps." });
    }

    // Check if construction has items
    if (!construction.items || construction.items.length === 0) {
      return res
        .status(400)
        .json({ message: "Construction items are not defined." });
    }

    // Check if settlement has enough materials
    for (const item of construction.items) {
      if (!item.constructed) {
        return res
          .status(400)
          .json({ message: "Constructed item is not defined." });
      }
      const requiredAmount = item.amountNeeded;
      const availableAmount =
        settlement.settlements_ToStorage?.find(
          (storage) =>
            storage.cc?.ccMaterials_id === item.constructed?.ccMaterials_id
        )?.amount ?? 0;

      if (requiredAmount > availableAmount) {
        return res
          .status(400)
          .json({ message: `Not enough ${item.constructed.name}.` });
      }
    }

    // Deduct bottleCaps and materials
    settlement.bottleCaps -= construction.cost;
    for (const item of construction.items) {
      const storage = settlement.settlements_ToStorage?.find(
        (storage) =>
          storage.cc?.ccMaterials_id === item.constructed?.ccMaterials_id
      );
      if (storage && item.constructed) {
        storage.amount -= item.amountNeeded;
      }
    }

    // Increase amountOwned
    // Assuming you have a relation between Settlements and ConstructedConstructions
    const constructedConstruction = new Constructed_Constructions();
    constructedConstruction.settlement = settlement;
    constructedConstruction.construction = construction;
    // You may need to populate other fields here

    await appDataSource
      .getRepository(Constructed_Constructions)
      .save(constructedConstruction);

    // Save changes to the database
    await appDataSource.getRepository(Settlements).save(settlement);

    res.status(200).json({ message: "Construction crafted successfully." });
  } catch (error) {
    console.error("Crafting failed:", error);
    res
      .status(500)
      .json({ message: "Crafting failed. Please try again later." });
  }
});

export default constructionsRouter;
