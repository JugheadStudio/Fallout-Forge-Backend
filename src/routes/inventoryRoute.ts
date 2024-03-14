import Express from "express";
import AppDataSource from "../dataSource";
import { Inventory } from "../entity/inventory";

const inventoryRouter = Express.Router()

inventoryRouter.use(Express.json())

const appDataSource = AppDataSource

inventoryRouter.get("/", async (req, res) => {
    try {
        // console.log("called")
        const inventory = await appDataSource
        .getRepository(Inventory)
        .find()

        res.json(inventory)
    }
    catch(error) {
        console.error("Error fetching inventory  items", error);
        res.status(500).json({ error: "Internal Server Error"});
    }
})

inventoryRouter.put("/:inventory_id", async (req, res) => {
    try {

        const inventory_id = parseInt(req.params.inventory_id)

        const { name, description, category, icon, amount } = req.body

        const inventoryItem = await appDataSource.getRepository(Inventory)
            .findOneBy({inventory_id: inventory_id})

        if(!inventoryItem) {
            res.status(404).json({message: "No item found"})
        }
        else {

            inventoryItem!.amount = amount


            const updatedItem = await appDataSource.getRepository(Inventory)
                .save(inventoryItem!)


            res.json(updatedItem)

        }


    }
    catch(error) {
        console.error("Error updating inventory  items", error);
        res.status(500).json({ error: "Internal Server Error"});
    }
})

export default inventoryRouter