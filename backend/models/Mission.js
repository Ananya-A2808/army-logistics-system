const db = require("../config/db");

const Mission = {
    getAll: (callback) => {
        const query = "SELECT * FROM Missions";
        db.query(query, callback);
    },

    addMission: (missionName, status, assignedPersonnel, assignedInventory, callback) => {
        const query =
            "INSERT INTO Missions (mission_name, status, assigned_personnel, assigned_inventory) VALUES (?, ?, ?, ?)";
        db.query(query, [missionName, status, assignedPersonnel, assignedInventory], callback);
    },
};

module.exports = Mission;
