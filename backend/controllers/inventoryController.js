const Inventory = require("../models/Inventory");

const getAllInventory = (req, res) => {
    Inventory.getAll((err, results) => {
        if (err) return res.status(500).json({ message: "Database error", err });
        res.json(results);
    });
};

const addInventoryItem = (req, res) => {
    const { itemName, category, quantity, maintenanceDue } = req.body;

    Inventory.addItem(itemName, category, quantity, maintenanceDue, (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", err });
        res.status(201).json({ message: "Inventory item added successfully" });
    });
};

const updateInventoryItem = (req, res) => {
    const { id, quantity, maintenanceDue } = req.body;

    Inventory.updateItem(id, quantity, maintenanceDue, (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", err });
        res.status(200).json({ message: "Inventory item updated successfully" });
    });
};

const deleteInventoryItem = (req, res) => {
    const { id } = req.params;

    Inventory.deleteItem(id, (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", err });
        res.status(200).json({ message: "Inventory item deleted successfully" });
    });
};

module.exports = { getAllInventory, addInventoryItem, updateInventoryItem, deleteInventoryItem };
