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
        let character_text = req.body.character;

        db.Character.update(
            {character_text: character_text},
            {where: {id: id}}
        )
        .then(response => {
            console.log(response);
            res.send("saved!");
        })
    }
}

module.exports = character;