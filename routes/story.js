// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const storyController = require('../controllers/story.js');

// ROUTES
router.get('/api/story', storyController.findOne);

router.post('/api/story', storyController.updateOne);

// EXPORT
module.exports = router;