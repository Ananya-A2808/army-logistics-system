const Inventory = require("../models/Inventory");

const getAllInventory = async (req, res) => {
    try {
        const results = await Inventory.getAll();
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
};

const addInventoryItem = async (req, res) => {
    try {
        const { itemName, category, quantity, maintenanceDue } = req.body;
        const result = await Inventory.addItem(itemName, category, quantity, maintenanceDue);
        res.status(201).json({ message: "Inventory item added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
};

const updateInventoryItem = async (req, res) => {
    try {
        const { id, quantity, maintenanceDue } = req.body;
        const result = await Inventory.updateItem(id, quantity, maintenanceDue);
        res.status(200).json({ message: "Inventory item updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
};

const deleteInventoryItem = async (req, res) => {
    try {
        const result = await Inventory.deleteItem(req.params.id);
        res.status(200).json({ message: "Inventory item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
};

module.exports = {
    getAllInventory,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem
};
