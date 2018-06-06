const express = require('express');
const db = require("./../models");

let character = {
    findAll: function(req, res) {
        db.Character.findAll().then(characters => {
            res.send(characters);
        })
    },

    updateOne: function(req, res) {
        let id = req.params.id;
        let column_name = req.body.column;
        let content_update = req.body.content;

        db.Character.update(
            {[column_name]: content_update},
            {where: {id:id}}
        )
        .then(response => {
            console.log(response);
            res.send("saved!");
        })
    }
}

module.exports = character;