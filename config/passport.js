const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const db = require('../models');
// make sure to camel case, be consistent! Creating new instance of LocalStrategy, finding one user where username = username input
module.exports = function (passport) {

    passport.use(new LocalStrategy(
        {usernameField:"email", passwordField:"password"},
        function(email, password, done) {
            console.log("pinging db for user")
            db.User.findOne({ 
              where: {
                  email: email 
                }
            }) 
            .then((user) => {
                // This is where the user will be returned if there is one
                
                if (!user) {
                    return done(null, false, {
                        message: "No user found"
                    })
                }

                let hashPassword = user.dataValues.password;
                // Using bcrypt to compare the password to the hashed stored password
                bcrypt.compare(password, hashPassword, (err, isMatch) => {
                    if (err) throw err;
                    // if the passwords match give us the user
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: "Password incorrect"
                        });
                    }
                })

                // Serializing the user
                passport.serializeUser((user, done) => {
                    console.log("serializing user")
                    done(null, user.id)
                });
                //Deserializing the user (this is copy pasta from passport)
                passport.deserializeUser((id, done) => {
                    console.log("deserializing user")
                    db.User.findOne({
                        where: {
                            id: id
                        }
                }).then((user) => {
                    done(null, user)
            });
        });
    
            }).catch((err) => {
                console.log(err);
            });
        }));
}