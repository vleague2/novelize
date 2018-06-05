const express = require('express');
const db = require("./../models");

let note = {
    findAll: function(req, res) {
        db.Note.findAll().then(notes => {
            res.send(notes);
        })
    }
}

module.exports = note;