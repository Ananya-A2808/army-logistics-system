const express = require('express');
const router = express.Router();
const { getAllPersonnel, getPersonnelById } = require('../controllers/personnelController');

router.get('/', getAllPersonnel);
router.get('/:id', getPersonnelById);

module.exports = router;
