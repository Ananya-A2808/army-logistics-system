const express = require("express");
const { getAllLogistics, addLogistics, updateLogistics, deleteLogistics } = require("../controllers/logisticsController");

const router = express.Router();

router.get("/", getAllLogistics);
router.post("/", addLogistics);
router.put("/:id", updateLogistics);
router.delete("/:id", deleteLogistics);

module.exports = router;
