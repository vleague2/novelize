// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const worldController = require('../controllers/world.js');

// ROUTES
router.get('/api/worldbuilds', worldController.findAll);

// EXPORT
module.exports = router;