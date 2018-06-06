// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const noteController = require('../controllers/notes.js');

// ROUTES
router.get('/api/notes', noteController.findAll);

router.post('/api/notes/:id', noteController.updateOne);

router.post('/api/new/note', noteController.addOne);

// EXPORT
module.exports = router;