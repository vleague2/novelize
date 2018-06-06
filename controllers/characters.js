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
            res.send("updated one character!");
        })
    },

    addOne: function(req, res) {
        let characterName = req.body.name;
        let characterPreview = req.body.preview;
        let characterImage = req.body.image;

        db.Character.create(
            {name: characterName, preview_text: characterPreview, character_image: characterImage}
        )
        .then(response => {
            console.log(response);
            res.send("Added one character!");
        })
    }
}

module.exports = character;