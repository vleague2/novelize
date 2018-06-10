// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const storyController = require('../controllers/story.js');

// ROUTES
router.get('/api/story/:id', storyController.findOne);

router.get('/api/stories/:userid', storyController.findAll);

router.post('/api/new/story', storyController.addOne);

router.post('/api/story/:id', storyController.updateOne);

// EXPORT
module.exports = router;