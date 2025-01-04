const express = require("express");
const { getAllLogistics, addLogistics, deleteLogistics } = require("../controllers/logisticsController");

const router = express.Router();

router.get("/", getAllLogistics);
router.post("/", addLogistics);
router.delete("/:id", deleteLogistics);

module.exports = router;
