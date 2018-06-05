// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const characterController = require('../controllers/characters.js');

// ROUTES
router.get('/api/characters', characterController.findAll);

router.post('/api/characters/:id', characterController.updateOne);

// EXPORT
module.exports = router;