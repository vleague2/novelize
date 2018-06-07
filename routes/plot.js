// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const plotController = require('../controllers/plot.js');

// ROUTES
router.get('/api/plots', plotController.findAll);

router.post('/api/plots/:id', plotController.updateOne);

router.post('/api/new/plot', plotController.addOne);

router.delete('/api/plots/:id', plotController.deleteOne);

// EXPORT
module.exports = router;