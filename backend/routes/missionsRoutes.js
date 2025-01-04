const express = require("express");
const { getAllMissions, addMission, deleteMission } = require("../controllers/missionController");

const router = express.Router();

router.get("/", getAllMissions);
router.post("/", addMission);
router.delete("/:id", deleteMission);

module.exports = router;
