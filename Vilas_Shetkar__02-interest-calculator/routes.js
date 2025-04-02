const express = require('express');
const { calculateInterest } = require('./controllers/interestController');

const router = express.Router();

router.get('/calculate', calculateInterest);

module.exports = router;
