const db = require("../config/db");

const Inventory = {
    getAll: (callback) => {
        const query = "SELECT * FROM Inventory";
        db.query(query, callback);
    },

    addItem: (itemName, category, quantity, maintenanceDue, callback) => {
        const query = "INSERT INTO Inventory (item_name, category, quantity, maintenance_due) VALUES (?, ?, ?, ?)";
        db.query(query, [itemName, category, quantity, maintenanceDue], callback);
    },

    updateItem: (id, quantity, maintenanceDue, callback) => {
        const query = "UPDATE Inventory SET quantity = ?, maintenance_due = ? WHERE id = ?";
        db.query(query, [quantity, maintenanceDue, id], callback);
    },

    deleteItem: (id, callback) => {
        const query = "DELETE FROM Inventory WHERE id = ?";
        db.query(query, [id], callback);
    },
};

module.exports = Inventory;
