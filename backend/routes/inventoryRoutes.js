const express = require("express");
const {
    getAllInventory,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
} = require("../controllers/inventoryController");

const router = express.Router();

router.get("/", getAllInventory);
router.post("/", addInventoryItem);
router.put("/", updateInventoryItem);
router.delete("/:id", deleteInventoryItem);

module.exports = router;
