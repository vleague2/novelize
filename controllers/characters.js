const express = require('express');
const db = require("./../models");

let character = {
    findAll: function(req, res) {
        db.Character.findAll().then(characters => {
            res.send(characters);
        })
    }
}

module.exports = character;