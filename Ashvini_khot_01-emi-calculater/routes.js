const express = require('express');
const router = express.Router();
const { calculateEMI } = require('./controllers/emiController');

router.get('/calculate', calculateEMI);

module.exports = router;
