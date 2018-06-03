// REQUIRED MODULES
const express = require('express');
const router = express.Router();

// REQUIRED CONTROLLERS
const userController = require('../controllers/users.js');

/************************ LOCAL AUTH ROUTES********************************* */


router.get('/login', (req, res) => {
    console.log("login page");
});

module.exports = router;