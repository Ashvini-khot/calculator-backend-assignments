const express = require('express');
const router = express.Router();
const { calculateAge } = require('./controllers/ageController');

router.get('/calculate', calculateAge);

module.exports = router;
