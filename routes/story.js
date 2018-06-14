// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const storyController = require('../controllers/story.js');

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

// ROUTE TO FIND ONE STORY
router.get('/api/story/:id', storyController.findOne);

// ROUTE TO FIND ALL STORIES
router.get('/api/stories/', checkAuthentication, storyController.findAll);

// ROUTE TO ADD A STORY
router.post('/api/new/story', storyController.addOne);

// ROUTE TO UPDATE A STORY
router.post('/api/story/:id', storyController.updateOne);

// ROUTE TO DELETE A STORY
router.delete('/api/story/:id', storyController.deleteOne);

// EXPORT
module.exports = router;