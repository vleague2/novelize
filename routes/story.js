const express = require('express');
const router = express.Router();

const storyController = require('../controllers/story.js');
const utils = require('../utils.js');

router.get('/api/story/:id', storyController.findOne);
router.get('/api/stories/', utils.checkAuthentication, storyController.findAll);
router.post('/api/new/story', storyController.addOne);
router.post('/api/story/:id', storyController.updateOne);
router.delete('/api/story/:id', storyController.deleteOne);

module.exports = router;