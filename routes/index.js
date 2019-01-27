const express = require('express');

const app = express();

app.use(require('./user.js'));
app.use(require("./character.js"));
app.use(require("./story.js"));
app.use(require("./world.js"));
app.use(require("./notes.js"));
app.use(require("./plot.js"));

module.exports = app;