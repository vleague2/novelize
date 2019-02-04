const express = require('express');
const router = express.Router();
const path = require('path');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');

const db = require('../models');

const user = {
    register: function(req, res) {
        const errors = [];

        const expressValidationErrors = validationResult(req);

        if (!expressValidationErrors.isEmpty()) {
            errors.push(expressValidationErrors.mapped());
        }

        console.log(errors);

        if (errors.length > 0) {
            console.log(errors.length);
            res.send({error: errors});
        }
        
        else {
            const password = matchedData(req).password;
            const email = matchedData(req).email;

            db.User.findOne({
                where: {
                    email
                }
            }).then(user => {
                if (user) {
                    errors.push({
                        user: "User already has an account"
                    })

                    console.log(errors);

                    res.send({ error: errors })
                }

                else {
                    bcrypt.genSalt(10, (err, salt)=> {
                        bcrypt.hash(password, salt, (err, hash) => {
                            const newUser = {
                                email,
                                password: hash
                            }

                            db.User.create(newUser).then(user => {
                                console.log(user);

                                const newUserData = user.dataValues;

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

        // Clear cookie and destroy session, to prevent issues from passport's logout mechanism
        res.clearCookie("connect-sid");
        req.session.destroy();

        res.send("success");
    }
}  

module.exports = user;