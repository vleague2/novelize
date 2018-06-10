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
        console.log("user session id: " + req.session.passport.user)
    },

    logout: function(req, res) {
        console.log("logging out")
        req.logout();
        res.clearCookie("connect-sid");
        req.session.destroy();
        res.send("success");
        
    }
}  

module.exports = user;