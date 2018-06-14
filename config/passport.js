const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../models');


module.exports = function (passport) {

    // CREATING A NEW INSTANCE OF LOCAL STRATEGY
    passport.use(new LocalStrategy(

        // PULL OUT THE EMAIL AND PASSWORD FIELDS
        {usernameField:"email", passwordField:"password"},

        function(email, password, done) {
            
            // CALL THE DATABASE TO FIND ONE USER
            db.User.findOne({
                
                // WHERE THE EMAIL MATCHES THE EMAIL FROM THE USER
                where: {
                  email: email 
                }
            }) 
            .then((user) => {
                
                // IF THERE IS NO USER THAT MATCHES
                if (!user) {

                    // RETURN THAT THERE WAS NO USER FOUND
                    return done(null, false, {
                        message: "No user found"
                    })
                }

                // STORE THE USER'S PASSWORD IN A VARIABLE TO BE HASHED
                let hashPassword = user.dataValues.password;

                // USE BCRYPT TO COMPARE THE PASSWORD TO THE HASHED STORED PASSWORD
                bcrypt.compare(password, hashPassword, (err, isMatch) => {

                    // IF THERE'S AN ERROR, THROW THE ERROR
                    if (err) throw err;

                    // IF THE PASSWORDS MATCH
                    if (isMatch) {

                        // RETURN THE USER
                        return done(null, user);

                    // IF THE PASSWORDS DON'T MATCH
                    } else {

                        // RETURN PASSWORD ERROR
                        return done(null, false, {
                            message: "Password incorrect"
                        });
                    }
                })

                // SERIALIZE THE USER
                passport.serializeUser((user, done) => {

                    console.log("serializing user")

                    // STORE THE USER'S ID
                    done(null, user.id)
                });

                // DESERIALIZE THE USER
                passport.deserializeUser((id, done) => {
                    console.log("deserializing user")

                    // CALL THE DB USER TABLE
                    db.User.findOne({

                        // WHERE THE USER'S ID MATCHES THE ID
                        where: {
                            id: id
                        }
                    }).then((user) => {

                        // RETURN THE USER
                        done(null, user)
                    });
                });
    
            }).catch((err) => {
                // IF THERE'S AN ERROR, LOG THE ERROR
                console.log(err);
            });
        }
    ));
}