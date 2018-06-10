// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const noteController = require('../controllers/notes.js');

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.send({error: "Unauthorized"});
    }
}

// ROUTES
router.get('/api/notes/:storyid', checkAuthentication, noteController.findAll);

router.post('/api/notes/:id', noteController.updateOne);

router.post('/api/new/note', noteController.addOne);

router.delete('/api/notes/:id', noteController.deleteOne);

// EXPORT
module.exports = router;