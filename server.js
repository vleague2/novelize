const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const Sequelize = require('sequelize');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const db = require("./models");

require('./config/passport')(passport);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.use(session({
  secret: process.env.COOKIE_SECRET || 'secret cookie',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: new Date(Date.now() + (60 * 3000 * 30)) }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes"));

// every other route will go through the react router
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync().then(function() {
  app.listen(PORT)
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

