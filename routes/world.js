const express = require('express');
const router = express.Router();

const worldController = require('../controllers/world.js');
const utils = require('../utils.js');

router.get('/api/worldbuilds/:storyid', utils.checkAuthentication, worldController.findAll);
router.post('/api/worlds/:id', worldController.updateOne);
router.post('/api/new/world', worldController.addOne);
router.delete('/api/worlds/:id', worldController.deleteOne);

module.exports = router;