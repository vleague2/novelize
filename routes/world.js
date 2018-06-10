// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const worldController = require('../controllers/world.js');

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.send({error: "Unauthorized"});
    }
}

// ROUTES
router.get('/api/worldbuilds/:storyid', checkAuthentication, worldController.findAll);

router.post('/api/worlds/:id', worldController.updateOne);

router.post('/api/new/world', worldController.addOne);

router.delete('/api/worlds/:id', worldController.deleteOne);

// EXPORT
module.exports = router;