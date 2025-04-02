require('dotenv').config();
const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve public files
app.use(express.static(path.join(__dirname, 'public')));

// Use mini-project-specific routes
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Interest Calculator running on http://localhost:${PORT}`);
});
