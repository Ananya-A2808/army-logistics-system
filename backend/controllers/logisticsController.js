const Logistics = require("../models/Logistics");

const getAllLogistics = (req, res) => {
    Logistics.getAll((err, results) => {
        if (err) return res.status(500).json({ message: "Database error", err });
        res.json(results);
    });
};

const addLogistics = (req, res) => {
    const { transportResource, fuelUsage, scheduleDate } = req.body;

    Logistics.addLogistics(transportResource, fuelUsage, scheduleDate, (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", err });
        res.status(201).json({ message: "Logistics data added successfully" });
    });
};

const deleteLogistics = (req, res) => {
    const { id } = req.params;

    Logistics.deleteLogistics(id, (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", err });
        res.status(200).json({ message: "Logistics record deleted successfully" });
    });
};

module.exports = { getAllLogistics, addLogistics, deleteLogistics };
