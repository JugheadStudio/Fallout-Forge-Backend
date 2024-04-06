import Express from "express";
import AppDataSource from "../dataSource";
import { Constructions } from "../entity/constructions";
import { Settlements } from "../entity/settlements";
import { Constructed_Constructions } from "../entity/constructed_constructions";
import { Items } from "../entity/items";

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

    // Find the construction with associated items
    const construction = await appDataSource
      .getRepository(Constructions)
      .findOne({
        where: { constructions_id: constructionId },
        relations: ["items"], // Eagerly load the associated items
      });

    // Check if settlement exists
    if (!construction) {
      return res.status(404).json({ message: "construction not found." });
    }

    // Check if construction cost is defined
    if (!construction.cost) {
      return res
        .status(400)
        .json({ message: "Construction cost is not defined." });
    }

    // Check if settlement has enough bottle caps
    if (settlement.bottleCaps < construction.cost) {
      return res.status(400).json({ message: "Not enough bottle caps." });
    }

    // Check if construction has items
    if (!construction.items || construction.items.length === 0) {
      return res
        .status(400)
        .json({ message: "Construction items are not defined." });
    }

    // Check if all required items are constructed
    for (const item of construction.items) {
      // Find the constructed item associated with the construction item
      const constructedItem = await appDataSource.getRepository(Items).findOne({
        where: { item_id: item.item_id },
        relations: ["constructedCorrectly"],
      });
      
      // Check if the constructed item exists
      if (!constructedItem) {
        return res
          .status(400)
          .json({ message: "Constructed item is not defined." });
      }

      // Check if the required amount of the constructed item is available
      const requiredAmount = item.amountNeeded;
      const availableAmount =
        settlement.settlements_ToStorage?.find(
          (storage) =>
            storage.cc?.ccMaterials_id ===
            constructedItem.constructedCorrectly?.ccMaterials_id
        )?.amount ?? 0;

      if (requiredAmount > availableAmount) {
        return res.status(400).json({
          message: `Not enough ${constructedItem.constructedCorrectly?.name}.`,
        });
      }
    }

    // Deduct bottle caps and materials
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

    // Create and save constructed construction
    const constructedConstruction = new Constructed_Constructions();
    constructedConstruction.settlement = settlement;
    constructedConstruction.construction = construction;
    await appDataSource
      .getRepository(Constructed_Constructions)
      .save(constructedConstruction);

    // Save changes to the settlement
    await appDataSource.getRepository(Settlements).save(settlement);

    // Send success response
    res.status(200).json({ message: "Construction crafted successfully." });
  } catch (error) {
    // Log the error for debugging
    console.error("Crafting failed:", error);

    // Send error response
    res
      .status(500)
      .json({ message: "Crafting failed. Please try again later." });
  }
});

export default constructionsRouter;
