const db = require("../config/db");

const Personnel = {
  getAll: (callback) => {
    const sql = "SELECT * FROM personnel";
    db.query(sql, callback);
  },
};

module.exports = Personnel;
