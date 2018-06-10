const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys'); //comment this out for deployment

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
    
            }).catch((err) => {
                console.log(err);
            });
        }));
        // Serializing the user
        passport.serializeUser((user, done) => {
            done(null, user.id)
        });
        //Deserializing the user (this is copy pasta from passport)
        passport.deserializeUser((id, done) => {
            db.User.findOne({
                where: {
                    id: id
                }
            }).then((user) => {
                done(null, user)
            });
        });


    
      /*
    passport.use(new LocalStrategy({
        emailField: 'email'
    }, (email, password, done) => {
        db.User.findOne({
            where: {
                email: email
            }
        }).then((user) => {
            // This is where the user will be returned if there is one
            let hashPassword = user.dataValues.password;
            if (!user) {
                return done(null, false, {
                    message: "No user found"
                })
            }
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

        }).catch((err) => {
            console.log(err);
        });
    }));
    // Serializing the user
    passport.serializeUser((user, done) => {
        done(null, user.id)
    });
    //Deserializing the user (this is copy pasta from passport)
    passport.deserializeUser((id, done) => {
        db.User.findOne({
            where: {
                id: id
            }
        }).then((user) => {
            done(null, user)
        });
    });

    


    /*********************GOOGLE STRATEGY CONFIG***************************** */
    passport.use(new GoogleStrategy({
            clientID: process.env.googleClientID || keys.googleClientID,
            clientSecret: process.env.googleClientSecret || keys.googleClientSecret,
            callbackURL: "https://localhost:3000/auth/google/callback",
            proxy: true
        },
        function (accessToken, refreshToken, profile, done) {
            // TAKE OUT THIS PART BECAUSE WE WILL BE SENDING IN THE USERNAME
            // took the gmail and just cut it off at the @ to make a username
            let userName = profile.emails[0].value.split('@')[0];
            console.log(userName);
            let newUser = {
                username: userName,
                email: profile.emails[0].value,
                googleId: profile.id
            }
            console.log(newUser);
            db.User.findOne({
                where: {
                    email:newUser.email
                }
            }).then((user) => {
               if (user){
                   done(null, user);
               } else {
                   db.User.create(newUser).then((user) => {
                     done (null, user);
                   })
               }
            });
        }
    ));
}