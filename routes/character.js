// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const characterController = require('../controllers/characters.js');

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.send({error: "Unauthorized"});
    }
}

// ROUTES
router.get('/api/characters/:storyid', checkAuthentication, characterController.findAll);

router.post('/api/characters/:id', characterController.updateOne);

router.post('/api/new/character', characterController.addOne);

router.delete('/api/characters/:id', characterController.deleteOne);

// EXPORT
module.exports = router;