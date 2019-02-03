const express = require('express');
const router = express.Router();

const noteController = require('../controllers/notes.js');
const utils = require('../utils.js');

router.get('/api/notes/:storyid', utils.checkAuthentication, noteController.findAll);
router.post('/api/notes/:id', noteController.updateOne);
router.post('/api/new/note', noteController.addOne);
router.delete('/api/notes/:id', noteController.deleteOne);

module.exports = router;