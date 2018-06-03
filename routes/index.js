// REQUIRED MODULES
const express = require('express');

// SET UP EXPRESS
const app = express();

// IMPORT ALL OTHER ROUTES
app.use(require('./user.js'));

// EXPORT APP FOR APP.JS TO USE
module.exports = app;