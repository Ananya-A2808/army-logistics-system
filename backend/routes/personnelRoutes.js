const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all personnel
router.get("/", (req, res) => {
  db.query("SELECT * FROM personnel", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Get details of a single person
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    `SELECT p.*, m.name AS mission FROM personnel p 
     LEFT JOIN mission_assignments ma ON ma.personnel_id = p.id 
     LEFT JOIN missions m ON ma.mission_id = m.id WHERE p.id = ?`,
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ ...results[0], missions: results.map((r) => r.mission) });
    }
  );
});

// Assign a mission
router.post("/:id/assign", (req, res) => {
  const { id } = req.params;
  const { missionId } = req.body;
  db.query(
    "INSERT INTO mission_assignments (personnel_id, mission_id) VALUES (?, ?)",
    [id, missionId],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Mission assigned successfully!" });
    }
  );
});

module.exports = router;
