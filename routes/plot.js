// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const plotController = require('../controllers/plot.js');

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

// ROUTE TO FIND ALL PLOTS
router.get('/api/plots/:storyid', checkAuthentication, plotController.findAll);

// ROUTE TO UPDATE ONE PLOT
router.post('/api/plots/:id', plotController.updateOne);

// ROUTE TO ADD A PLOT
router.post('/api/new/plot', plotController.addOne);

// ROUTE TO DELETE A PLOT
router.delete('/api/plots/:id', plotController.deleteOne);

// EXPORT
module.exports = router;