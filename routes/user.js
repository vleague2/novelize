// REQUIRED MODULES
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {check} = require('express-validator/check');

// REQUIRED CONTROLLERS
const userController = require('../controllers/users.js');

const db = require('../models');

// ROUTE TO REGISTER A USER
router.post('/register', 
// VALIDATE THE DATA
[
    // CHECK IF EMAIL IS AN EMAIL, INSERT FEEDBACK MESSAGE, TRIM EMAIL, NORMALIZE EMAIL
    check('email')
        .isEmail()
        .withMessage("Must input valid email").trim()
        .normalizeEmail(),

    // CHECK IF PASSWORD IS MIN LENGTH, TRIM IT, ADD FEEDBACK MESSAGE
    check('password')
        .trim()
        .isLength({min: 5})
        .withMessage("Password must be 5 characters long"),
],
 userController.register);

//  ROUTE FOR USER TO LOGIN, WHICH UTILIZES PASSPORT LOCAL STRATEGY
router.post('/auth/login', passport.authenticate('local'), userController.login);

// ROUTE FOR USER TO LOGOUT
router.get('/auth/logout', userController.logout);
;

module.exports = router;