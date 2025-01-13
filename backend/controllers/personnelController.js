const dataService = require('../services/dataService');

const getAllPersonnel = async (req, res) => {
  try {
    const personnel = await dataService.getPersonnel();
    res.json(personnel);
  } catch (error) {
    res.status(500).json({ message: "Error fetching personnel", error: error.message });
  }
};

const getPersonnelById = async (req, res) => {
  try {
    const personnel = await dataService.getPersonnel();
    const person = personnel.find(p => p.id === parseInt(req.params.id));
    if (!person) {
      return res.status(404).json({ message: "Personnel not found" });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ message: "Error fetching personnel", error: error.message });
  }
};

module.exports = {
  getAllPersonnel,
  getPersonnelById
};
