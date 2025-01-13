const express = require("express");
const router = express.Router();
const {
  getAllMissions,
  getMissionById,
  addMission,
  updateMission,
  deleteMission,
} = require("../controllers/missionController");

// Mission endpoints
router.get("/", getAllMissions);
router.get("/:id", getMissionById);
router.post("/", addMission);
router.put("/:id", updateMission);
router.delete("/:id", deleteMission);

module.exports = router;
