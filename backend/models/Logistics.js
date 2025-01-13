const db = require("../config/db");

const Logistics = {
    async getAll() {
        try {
            const [rows] = await db.query("SELECT * FROM Logistics");
            return rows;
        } catch (error) {
            throw error;
        }
    },

    async addLogistics(transportResource, fuelUsage, scheduleDate) {
        try {
            const [result] = await db.query(
                "INSERT INTO Logistics (transport_resource, fuel_usage, schedule_date) VALUES (?, ?, ?)",
                [transportResource, fuelUsage, scheduleDate]
            );
            return result;
        } catch (error) {
            throw error;
        }
    },

    async deleteLogistics(id) {
        try {
            const [result] = await db.query(
                "DELETE FROM Logistics WHERE id = ?",
                [id]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = Logistics;
