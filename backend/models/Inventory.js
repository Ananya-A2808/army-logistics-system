const db = require("../config/db");

const Inventory = {
    async getAll() {
        try {
            const [rows] = await db.query("SELECT * FROM Inventory");
            return rows;
        } catch (error) {
            throw error;
        }
    },

    async addItem(itemName, category, quantity, maintenanceDue) {
        try {
            const [result] = await db.query(
                "INSERT INTO Inventory (item_name, category, quantity, maintenance_due) VALUES (?, ?, ?, ?)",
                [itemName, category, quantity, maintenanceDue]
            );
            return result;
        } catch (error) {
            throw error;
        }
    },

    async updateItem(id, quantity, maintenanceDue) {
        try {
            const [result] = await db.query(
                "UPDATE Inventory SET quantity = ?, maintenance_due = ? WHERE id = ?",
                [quantity, maintenanceDue, id]
            );
            return result;
        } catch (error) {
            throw error;
        }
    },

    async deleteItem(id) {
        try {
            const [result] = await db.query(
                "DELETE FROM Inventory WHERE id = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Inventory;
