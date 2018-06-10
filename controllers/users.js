const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const keys = require('../config/keys');
const {validationResult} = require('express-validator/check');
const { matchedData } = require('express-validator/filter');

const db = require('../models');

/************************ LOCAL AUTH ROUTES****NO TOUCH***************************** */

let user = {
    register: function(req, res) {
        // An empty array to hold error messages
        let errors = [];

        // pull out the validation result
        let expressValidErrors = validationResult(req);

        // if we have errors, push them into the error array
        if (!expressValidErrors.isEmpty()) {
            errors.push(expressValidErrors.mapped());
        }

        console.log(errors);

        // If we have validation errors, send them to front-end
        if (errors.length > 0) {
            console.log(errors.length);
            res.send({error: errors});
        }
        
        // if we have no errors, proceed!
        else {

            // pull out values of things that passed validation
            let username = matchedData(req).username;

            let password = matchedData(req).password;

            let email = matchedData(req).email;
            console.log("email: " + email)

            // Find a user that already exists based on the email address
            console.log("finding user that matches email")
            db.User.findOne({
                where: {
                    email: email
                }
            }).then(user => {
                // if a user already exists, send an error that the username is taken
                if (user) {
                    errors.push({
                        user: "User already has an account"
                    })

                    console.log(errors);

                    res.send({error: errors})
                }
                // if the user isn't already in the database, proceed with creating the user
                else {

                    // generate a salt
                    bcrypt.genSalt(10, (err, salt)=> {
                        // hash the password with the salt
                        bcrypt.hash(password, salt, (err, hash)=> {
                            // create the newuser object that we'll send to the db
                            let newUser = {
                                // lowercase the username so it's not case sensitive
                                username: username.toLowerCase(),
                                email: email,
                                password: hash
                            }
                            // send db call to create new user
                            db.User.create(newUser).then(user => {
                                console.log(user);

                                let newUserData = user.dataValues;
                                res.send(newUserData);
                            })
                        })
                    })
                }
            })
        }
    },

    login: function(req, res) {
        res.send(req.user)
    },

    logout: function(req, res) {
        console.log("logging out")
        req.logout();
        res.send("success");
    }
}
/*

router.post('/register', (req, res) => {
    let errors = [];
    // This requires the password to be longer than 5 characters
    if (req.body.password.length < 5) {
        errors.push({
            text: "Password must be at least 5 characters"
        });
    }
    if (errors.length > 0) {
        //This will allow us to refresh the page but keep the users info populated if they cause an error.
        res.render('users/register', {
            errors: errors,
            userName: req.body.userName,
            email: req.body.email

        });

    } else {
        // Find if a user already exists
        db.User.findOne({
            where: {
                username: req.body.username
            }
        }).then((user) => {
            // If a user exists re-render the page and keep their fields populated
            if (user) {
                errors.push({
                    text: "User already exists, please choose a new username"
                });
                res.render('users/register', {
                    errors: errors,
                    userName: req.body.userName,
                    email: req.body.email

                });
            } else {
                let insecurePass = req.body.password;
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(insecurePass, salt, (err, hash) => {
                        let newUser = {
                            username: req.body.userName.toLowerCase(),
                            email: req.body.email,
                            password: hash
                        }
                        db.User.create(newUser).then(function (user) {
                            res.redirect('/auth/login');
                        });
                    });
                });
            }
        })
    }



});

router.post('/login', (req, res, next) => {
    db.User.findOne({
        where: {
            username: req.body.userName.toLowerCase()
        }
    }).then((user) => {
        let userId = user.dataValues.id;
        if (user) {
            // calling passport authenticate method
            console.log('redirecting user..');
            passport.authenticate('local', {
                successRedirect: `/profile/${req.body.userName.toLowerCase()}`,
                failureRedirect: "/auth/login",
                failureFlash: "Invalid username or password",
                successFlash: `Welcome ${user.dataValues.username}`
            })(req, res, next);
        }
    });
});
*/
/********************************************************* */

/*****************GOOGLE AUTH ROUTES************************** */

/*
router.get('/google', passport.authenticate('google', {
    // scope is what do you want from google
    scope: ['profile', 'email']
}));
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/'
}), (req, res) => {
    let username = res.req.user.dataValues.username;
    res.redirect(`/profile/${username}`);
});
*/
module.exports = user;

