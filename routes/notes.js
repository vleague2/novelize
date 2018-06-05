// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const noteController = require('../controllers/notes.js');

// ROUTES
router.get('/api/notes', noteController.findAll);

// EXPORT
module.exports = router;