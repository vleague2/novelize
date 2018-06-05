const express = require('express');
const db = require("./../models");

let world = {
    findAll: function(req, res) {
        db.World.findAll().then(worlds => {
            res.send(worlds);
        })
    }
}

module.exports = world;