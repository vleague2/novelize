const express = require('express');
const router = express.Router();

const characterController = require('../controllers/characters.js');
const checkAuthentication = require('../utils.js');

router.get('/api/characters/:storyid', checkAuthentication, characterController.findAll);
router.post('/api/characters/:id', characterController.updateOne);
router.post('/api/new/character', characterController.addOne);
router.delete('/api/characters/:id', characterController.deleteOne);

module.exports = router;