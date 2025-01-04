const Personnel = require("../models/personnel");

const getAllPersonnel = (req, res) => {
  Personnel.getAll((err, results) => {
    if (err) {
      res.status(500).send("Database error");
      return;
    }
    res.json(results);
  });
};

module.exports = { getAllPersonnel };
