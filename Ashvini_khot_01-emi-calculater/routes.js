const express = require('express');
const { calculateEMI } = require('./controllers/emiController');

const router = express.Router();

router.get('/emi', calculateEMI);

module.exports = router;
