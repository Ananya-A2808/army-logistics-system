const dataService = require('../services/dataService');

const getAllMissions = async (req, res) => {
  try {
    const missions = await dataService.getMissions();
    res.json(missions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching missions", error: error.message });
  }
};

const getMissionById = async (req, res) => {
  try {
    const missions = await dataService.getMissions();
    const mission = missions.find(m => m.id === parseInt(req.params.id));
    if (!mission) {
      return res.status(404).json({ message: "Mission not found" });
    }
    res.json(mission);
  } catch (error) {
    res.status(500).json({ message: "Error fetching mission", error: error.message });
  }
};

const addMission = async (req, res) => {
  try {
    const mission = await dataService.addMission(req.body);
    res.status(201).json(mission);
  } catch (error) {
    res.status(500).json({ message: "Error creating mission", error: error.message });
  }
};

const updateMission = async (req, res) => {
  try {
    const updatedMission = await dataService.updateMission(parseInt(req.params.id), req.body);
    if (!updatedMission) {
      return res.status(404).json({ message: "Mission not found" });
    }
    res.json(updatedMission);
  } catch (error) {
    res.status(500).json({ message: "Error updating mission", error: error.message });
  }
};

const deleteMission = async (req, res) => {
  try {
    const success = await dataService.deleteMission(parseInt(req.params.id));
    if (!success) {
      return res.status(404).json({ message: "Mission not found" });
    }
    res.json({ message: "Mission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting mission", error: error.message });
  }
};

module.exports = {
  getAllMissions,
  getMissionById,
  addMission,
  updateMission,
  deleteMission
};
