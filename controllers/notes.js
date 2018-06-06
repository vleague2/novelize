const express = require('express');
const db = require("./../models");

let note = {
    findAll: function(req, res) {
        db.Note.findAll().then(notes => {
            res.send(notes);
        })
    },

    updateOne: function(req, res) {
        let id = req.params.id;
        let column_name = req.body.column;
        let content_update = req.body.content;

        db.Note.update(
            {[column_name]: content_update},
            {where: {id:id}}
        )
        .then(response => {
            console.log(response);
            res.send("updated one note item!");
        })
    },

    addOne: function(req, res) {
        let noteTitle = req.body.title;

        db.Note.create(
            {title: noteTitle}
        )
        .then(response => {
            console.log(response);
            res.send("Added one note item!");
        })
    }
}

module.exports = note;