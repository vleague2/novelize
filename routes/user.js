const express = require('express');
const router = express.Router();
const passport = require('passport');
const {check} = require('express-validator/check');

const userController = require('../controllers/users.js');
const db = require('../models');

router.post(
    '/register', 
    [
        check('email')
            .isEmail()
            .withMessage("Must input valid email").trim()
            .normalizeEmail(),

        check('password')
            .trim()
            .isLength({min: 5})
            .withMessage("Password must be 5 characters long"),
    ],
    userController.register
);
router.post('/auth/login', passport.authenticate('local'), userController.login);
router.get('/auth/logout', userController.logout);

module.exports = router;