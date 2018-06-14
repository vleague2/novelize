// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const characterController = require('../controllers/characters.js');

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

// ROUTE TO FIND ALL CHARACTERS
router.get('/api/characters/:storyid', checkAuthentication, characterController.findAll);

// ROUTE TO UPDATE A CHARACTER
router.post('/api/characters/:id', characterController.updateOne);

// ROUTE TO ADD A CHARACTER
router.post('/api/new/character', characterController.addOne);

// ROUTE TO DELETE A CHARACTER
router.delete('/api/characters/:id', characterController.deleteOne);

// EXPORT
module.exports = router;