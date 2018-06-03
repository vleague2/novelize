// REQUIRED MODULES
const express = require('express');
const router = express.Router();
const passport = require('passport');

// REQUIRED CONTROLLERS
const userController = require('../controllers/users.js');

// const passport = 

/************************ LOCAL AUTH ROUTES********************************* */


// router.post('/signup', passport.authenticate('local-signup', {
//     successRedirect: "/"
// }));

// router.post('/register', (req, res) => {
//     res.send({"yup": "wassup"})
// })

router.post('/register', passport.authenticate('local', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/login'
}))

module.exports = router;