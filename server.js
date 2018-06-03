const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const Sequelize = require('sequelize');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');


// require('./config/passport')(passport); 

// require our database models folder
const db = require("./models");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cookieParser());

// session setup
app.use(session({
  secret:'secret',
  resave: false,
  saveUninitialized: false
}))

// passport setup
app.use(passport.initialize());
app.use(passport.session());


// routes
app.use(require("./routes"));


// sync db
db.sequelize.sync().then(function() {
  app.listen(PORT)
  // Log port number
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});


// Send every request to the React app
// Define any API routes before this runs
/* app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

*/
