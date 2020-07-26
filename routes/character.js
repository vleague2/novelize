const express = require('express');
const router = express.Router();

const characterController = require('../controllers/characters.js');
const utils = require('../utils.js');

router.get('/api/characters/:storyid', utils.checkAuthentication, characterController.findAll);
// @TODO this really should be a patch
router.post('/api/characters/:id', characterController.updateOne);
// @TODO this is a horrible route name, but it's temporary. the updates should just be one endpoint
router.post('/api/characters/update/:id', characterController.updateAll);
router.post('/api/new/character', characterController.addOne);
router.delete('/api/characters/:id', characterController.deleteOne);

module.exports = router;