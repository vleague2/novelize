// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const plotController = require('../controllers/plot.js');

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.send({error: "Unauthorized"});
    }
}

// ROUTES
router.get('/api/plots/:storyid', checkAuthentication, plotController.findAll);

router.post('/api/plots/:id', plotController.updateOne);

router.post('/api/new/plot', plotController.addOne);

router.delete('/api/plots/:id', plotController.deleteOne);

// EXPORT
module.exports = router;