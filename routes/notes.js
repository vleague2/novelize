// REQUIRED MODULES
const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');

// REQUIRED CONTROLLERS
const noteController = require('../controllers/notes.js');

// ROUTES
router.get('/api/notes/:storyid', noteController.findAll);

router.post('/api/notes/:id', /*[
    body('content').trim().escape()
],*/ noteController.updateOne);

router.post('/api/new/note', noteController.addOne);

router.delete('/api/notes/:id', noteController.deleteOne);

// EXPORT
module.exports = router;