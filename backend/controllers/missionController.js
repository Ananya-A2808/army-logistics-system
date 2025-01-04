const Mission = require("../models/Mission");

const getAllMissions = (req, res) => {
    Mission.getAll((err, results) => {
        if (err) return res.status(500).json({ message: "Database error", err });
        res.json(results);
    });
};

const addMission = (req, res) => {
    const { missionName, status, assignedPersonnel, assignedInventory } = req.body;

    Mission.addMission(missionName, status, assignedPersonnel, assignedInventory, (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", err });
        res.status(201).json({ message: "Mission added successfully" });
    });
};

const deleteMission = (req, res) => {
    const { id } = req.params;

    Mission.deleteMission(id, (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", err });
        res.status(200).json({ message: "Mission deleted successfully" });
    });
};

module.exports = { getAllMissions, addMission, deleteMission };
