require('dotenv').config();
const express = require('express');
const path = require('path');
const routes = require('./routes'); // Import the updated routes

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', routes); // Use `/api` for structured endpoints

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
