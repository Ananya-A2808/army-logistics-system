const dataService = require('../services/dataService');

const getAllLogistics = async (req, res) => {
    try {
        const logistics = await dataService.getLogistics();
        res.json(logistics);
    } catch (error) {
        console.error('Error in getAllLogistics:', error);
        res.status(500).json({ 
            message: "Error fetching logistics data", 
            error: error.message 
        });
    }
};

const addLogistics = async (req, res) => {
    try {
        const newLogistics = await dataService.addLogistics(req.body);
        res.status(201).json(newLogistics);
    } catch (error) {
        console.error('Error in addLogistics:', error);
        res.status(500).json({ 
            message: "Error adding logistics entry", 
            error: error.message 
        });
    }
};

const updateLogistics = async (req, res) => {
    try {
        const updated = await dataService.updateLogistics(parseInt(req.params.id), req.body);
        if (!updated) {
            return res.status(404).json({ message: "Logistics entry not found" });
        }
        res.json(updated);
    } catch (error) {
        console.error('Error in updateLogistics:', error);
        res.status(500).json({ 
            message: "Error updating logistics entry", 
            error: error.message 
        });
    }
};

const deleteLogistics = async (req, res) => {
    try {
        const deleted = await dataService.deleteLogistics(parseInt(req.params.id));
        if (!deleted) {
            return res.status(404).json({ message: "Logistics entry not found" });
        }
        res.json({ message: "Logistics entry deleted successfully" });
    } catch (error) {
        console.error('Error in deleteLogistics:', error);
        res.status(500).json({ 
            message: "Error deleting logistics entry", 
            error: error.message 
        });
    }
};

module.exports = {
    getAllLogistics,
    addLogistics,
    updateLogistics,
    deleteLogistics
};
