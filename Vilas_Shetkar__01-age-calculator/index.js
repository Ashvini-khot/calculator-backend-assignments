require('dotenv').config(); // Load .env variables
const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000; // Use .env port

// Serve public files
app.use(express.static(path.join(__dirname, 'public')));

// Use mini-project-specific routes
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Age Calculator running on http://localhost:${PORT}`);
});
