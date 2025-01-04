const express = require("express");
const router = express.Router();
const { getAllPersonnel } = require("../controllers/personnelController");

router.get("/", getAllPersonnel);

module.exports = router;
