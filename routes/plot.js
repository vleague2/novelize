const express = require('express');
const router = express.Router();

const plotController = require('../controllers/plot.js');
const utils = require('../utils.js');

router.get('/api/plots/:storyid', utils.checkAuthentication, plotController.findAll);
router.post('/api/plots/:id', plotController.updateOne);
router.post('/api/new/plot', plotController.addOne);
router.delete('/api/plots/:id', plotController.deleteOne);

module.exports = router;