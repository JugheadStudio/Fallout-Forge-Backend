import Express from "express";
import AppDataSource from "../dataSource";
import { Constructed_Constructions } from "../entity/constructed_constructions";

const ccRouter = Express.Router();

ccRouter.use(Express.json());

const appDataSource = AppDataSource;

ccRouter.get("/", async (req, res) => {
  try {
    // console.log("called")
    const cc = await appDataSource
      .getRepository(Constructed_Constructions)
      .find();

    res.json(cc);
  } catch (error) {
    console.error("Error fetching cc  items", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// inventoryRouter.put("/:inventory_id", async (req, res) => {
//     try {

//         const inventory_id = parseInt(req.params.inventory_id)

//         const { name, description, category, icon, amount } = req.body

//         const inventoryItem = await appDataSource.getRepository(Inventory)
//             .findOneBy({inventory_id: inventory_id})

//         if(!inventoryItem) {
//             res.status(404).json({message: "No item found"})
//         }
//         else {

//             inventoryItem!.amount = amount

//             const updatedItem = await appDataSource.getRepository(Inventory)
//                 .save(inventoryItem!)

//             res.json(updatedItem)

//         }

//     }
//     catch(error) {
//         console.error("Error updating inventory  items", error);
//         res.status(500).json({ error: "Internal Server Error"});
//     }
// })

export default ccRouter;
