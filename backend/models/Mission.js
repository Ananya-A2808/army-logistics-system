const db = require("../config/db");

const Mission = {
  getAll: (callback) => {
    const query = "SELECT * FROM Missions";
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = "SELECT * FROM Missions WHERE mission_id = ?";
    db.query(query, [id], callback);
  },

  addMission: (missionData, callback) => {
    const { missionName, objective, location, status, assignedPersonnel, assignedInventory, deadline } = missionData;
    const query =
      "INSERT INTO Missions (mission_name, objective, location, status, assigned_personnel, assigned_inventory, deadline) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [missionName, objective, location, status, assignedPersonnel, assignedInventory, deadline],
      callback
    );
  },

  updateMission: (id, missionData, callback) => {
    const { missionName, objective, location, status, assignedPersonnel, assignedInventory, deadline } = missionData;
    const query =
      "UPDATE Missions SET mission_name = ?, objective = ?, location = ?, status = ?, assigned_personnel = ?, assigned_inventory = ?, deadline = ? WHERE mission_id = ?";
    db.query(
      query,
      [missionName, objective, location, status, assignedPersonnel, assignedInventory, deadline, id],
      callback
    );
  },

  deleteMission: (id, callback) => {
    const query = "DELETE FROM Missions WHERE mission_id = ?";
    db.query(query, [id], callback);
  },
};

module.exports = Mission;
