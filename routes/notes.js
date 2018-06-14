// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const noteController = require('../controllers/notes.js');

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

// ROUTE TO FIND ALL NOTES
router.get('/api/notes/:storyid', checkAuthentication, noteController.findAll);

// ROUTE TO UPDATE A NOTE
router.post('/api/notes/:id', noteController.updateOne);

// ROUTE TO ADD A NOTE
router.post('/api/new/note', noteController.addOne);

// ROUTE TO DELETE A CHARACTER
router.delete('/api/notes/:id', noteController.deleteOne);

// EXPORT
module.exports = router;