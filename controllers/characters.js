const express = require('express');
const db = require("./../models");
const he = require("he");

let character = {
    findAll: function(req, res) {

        let storyId = req.params.storyid;

        db.Character.findAll({
            where: {StoryId: storyId}
        }).then(characters => {

             // SERVER SIDE SANITIZATION - DECODING TO SEND BACK TO USE
             characters.forEach(character => {
                if (character.name !==null) {
                    character.name = he.decode(character.name);
                }
                if ( character.character_text !== null) {
                    character.character_text = he.decode(character.character_text);
                }
                
                if (character.preview_text !== null) {
                    character.preview_text = he.decode(character.preview_text)
                }
               
                if (character.character_image) {
                    character.character_image = he.decode(character.character_image);
                }
                   
            })

            res.send(characters);
        })
    },

    updateOne: function(req, res) {
        let id = req.params.id;
        let column_name = req.body.column;
        let content_update = req.body.content;

        let encodedContent = he.encode(content_update);

        db.Character.update(
            {[column_name]: encodedContent},
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
        let storyId = req.body.storyId

        let encodedName = he.encode(characterName);
        let encodedPreview = he.encode(characterPreview);
        let encodedImage = he.encode(characterImage);

        db.Character.create(
            {name: encodedName, preview_text: encodedPreview, character_image: encodedImage, StoryId: storyId}
        )
        .then(response => {
            console.log(response);
            res.send("Added one character!");
        })
    },

    deleteOne: function(req, res) {
        let id = req.params.id;

        db.Character.destroy(
            {where: {id:id}}
        )
        .then(response => {
            console.log(response);
            res.send("Deleted one character");
        })
    }
}

module.exports = character;