// REQUIRED MODULES
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {check} = require('express-validator/check');

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

router.get("/logout", (req, res)=> {
    req.logout();
    res.redirect('/');
})

router.post('/register', 
[
    check('email')
        .isEmail()
        .withMessage("Must input valid email").trim()
        .normalizeEmail(),
    check('password')
        .trim()
        .isLength({min: 5})
        .withMessage("Password must be 5 characters long"),
    check('username')
        .trim()
        .isLength({min: 5})    
        .withMessage("Username must be 5 characters long") 
],
 userController.register);

module.exports = router;