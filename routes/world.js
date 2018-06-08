// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const worldController = require('../controllers/world.js');

// ROUTES
router.get('/api/worldbuilds/:storyid', worldController.findAll);

router.post('/api/worlds/:id', worldController.updateOne);

router.post('/api/new/world', worldController.addOne);

router.delete('/api/worlds/:id', worldController.deleteOne);

// EXPORT
module.exports = router;