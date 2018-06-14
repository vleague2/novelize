const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const {validationResult} = require('express-validator/check');
const { matchedData } = require('express-validator/filter');

const db = require('../models');


let user = {

    // FUNCTION FOR USER TO REGISTER
    register: function(req, res) {
        // AN EMPTY ARRAY TO HOLD ERROR MESSAGES
        let errors = [];

        // PULL OUT THE VALIDATION RESULT
        let expressValidErrors = validationResult(req);

        // IF WE HAVE ERRORS, PUSH THEM TO THE ERROR ARRAY
        if (!expressValidErrors.isEmpty()) {
            errors.push(expressValidErrors.mapped());
        }

        // CONSOLE LOG ERRORS ARRAY
        console.log(errors);

        // IF WE HAVE VALIDATION ERRORS, SEND THEM TO FRONT-END
        if (errors.length > 0) {
            console.log(errors.length);
            res.send({error: errors});
        }
        
        // IF WE HAVE NO ERRORS, PROCEED
        else {

            // PULL OUT VALUES OF THINGS THAT PASSED VALIDATION
            let password = matchedData(req).password;
            let email = matchedData(req).email;

            // CHECK IF A USER ALREADY EXISTS BASED ON EMAIL
            db.User.findOne({

                //WHERE THE EMAIL MATCHES
                where: {
                    email: email
                }
            }).then(user => {
                // IF A USER ALREADY EXISTS, CREATE AN ERROR THAT THE USERNAME ALREADY HAS AN ACCOUNT
                if (user) {
                    errors.push({
                        user: "User already has an account"
                    })

                    console.log(errors);

                    // SEND THE ERROR TO THE FRONT END
                    res.send({error: errors})
                }
                // IF THE USER ISN'T ALREADY IN THE DB, PROCEED WITH CREATING USER
                else {

                    // GENERATE A SALT
                    bcrypt.genSalt(10, (err, salt)=> {
                        // HASH THE PASSWORD WITH THE SALT
                        bcrypt.hash(password, salt, (err, hash)=> {
                            // CREATE THE USER OBJECT THAT THE DB WILL USE
                            let newUser = {
                                email: email,
                                password: hash
                            }
                            // DB CALL TO CREATE THE USER
                            db.User.create(newUser).then(user => {
                                console.log(user);

                                // GRAB THE USER DATA FROM THE RESPONSE
                                let newUserData = user.dataValues;

                                // SEND TO THE FRONT END
                                res.send(newUserData);
                            })
                        })
                    })
                }
            })
        }
    },

    // FUNCTION TO LOG IN A USER
    login: function(req, res) {

        // SEND THE USER TO THE FRONT END
        res.send(req.user)

        // CONSOLE LOG THE USER ID THAT'S IN SESSION
        console.log("user session id: " + req.session.passport.user)
    },

    // FUNCTION TO LOGOUT THE USER
    logout: function(req, res) {
        console.log("logging out")

        // USE PASSPORT'S LOGOUT FEATURE
        req.logout();

        // CLEAR THE COOKIE FROM THE SESSION
        res.clearCookie("connect-sid");

        // DESTROY THE SESSION
        req.session.destroy();

        // SEND A MESSAGE BACK TO THE FRONT END
        res.send("success");
    }
}  

module.exports = user;