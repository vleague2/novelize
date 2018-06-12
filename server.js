const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const Sequelize = require('sequelize');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

// REQUIRE DATABASE MODELS FOLDER
const db = require("./models");

// SET UP PASSPORT
require('./config/passport')(passport);

// SERVE STATIC ASSETS WHEN DEPLOYED
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//BODY PARSER AND COOKIE PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

// SESSION SETUP
app.use(session({
  // ACCESS ENV COOKIE VARIABLE WHEN DEPLOYED
  secret: process.env.COOKIE_SECRET || 'victorias secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: new Date(Date.now() + (60 * 3000 * 30)) }
}))

// PASSPORT SETUP
app.use(passport.initialize());
app.use(passport.session());

// USE API ROUTES
app.use(require("./routes"));

// EVERY OTHER ROUTE WILL GO THROUGH THE REACT ROUTER
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// SYNC DATABASE
db.sequelize.sync().then(function() {
  // START THE PORT
  app.listen(PORT)
  // LOG PORT NUMBER
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

