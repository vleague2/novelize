// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const worldController = require('../controllers/world.js');

// CREATE FUNCTION TO CHECK IF USER IS AUTHENTICATED
function checkAuthentication(req,res,next){

    // IF THEY ARE 
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in

        // RUN THE NEXT FUNCTION
        next();
    } else{

        // IF NOT, SEND AN ERROR
        res.send({error: "Unauthorized"});
    }
}

// ROUTES

// ROUTE TO FIND ALL WORLDS
router.get('/api/worldbuilds/:storyid', checkAuthentication, worldController.findAll);

// ROUTE TO UPDATE A WORLD
router.post('/api/worlds/:id', worldController.updateOne);

// ROUTE TO ADD A NEW WORLD
router.post('/api/new/world', worldController.addOne);

// ROUTE TO DELETE A WORLD
router.delete('/api/worlds/:id', worldController.deleteOne);

// EXPORT
module.exports = router;