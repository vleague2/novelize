// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const storyController = require('../controllers/story.js');

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.send({error: "Unauthorized"});
    }
}

// ROUTES
router.get('/api/story/:id', storyController.findOne);

router.get('/api/stories/', checkAuthentication, storyController.findAll);

router.post('/api/new/story', storyController.addOne);

router.post('/api/story/:id', storyController.updateOne);

router.delete('/api/story/:id', storyController.deleteOne);

// EXPORT
module.exports = router;