// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const worldController = require('../controllers/world.js');

// ROUTES
router.get('/api/worldbuilds', worldController.findAll);

router.post('/api/worlds/:id', worldController.updateOne);

router.post('/api/new/world', worldController.addOne);

// EXPORT
module.exports = router;