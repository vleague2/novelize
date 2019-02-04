const express = require('express');
const db = require("./../models");
const he = require("he");

const character = {
    findAll: function(req, res) {
        const { storyid } = req.params;

        db.Character.findAll({
            where: { StoryId: storyid }
        }).then(characters => {
            if (characters.length > 0 ) {
                // Server-side sanitization
                characters.forEach(character => {
                    // @TODO: clean this up & shorten
                    // @TODO: create new character object to avoid mutating data
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
            }

            else {
                // Send back an empty array so the FE knows there are no characters yet
                res.send([]);
            }  
        })
    },

    updateOne: function(req, res) {
        const { id } = req.params;

        const { column, content } = req.body;

        const encodedContent = he.encode(content);

        db.Character.update(
            {[column]: encodedContent},
            {where: { id }}
        )
        .then(response => {
            res.send("updated one character!");
            console.log("updated one character")
        })
    },

    addOne: function(req, res) {
        const { name, preview, image, storyId } = req.body;

        // @TODO: continuing other todo about encoding, maybe this can be a util service
        const character = {
            name: he.encode(name),
            preview_text: he.encode(preview),
            character_image: he.encode(image),
            StoryId: storyId
        }

        db.Character.create(
            character
        )
        .then(response => {
            console.log(response.dataValues);
            res.send(response.dataValues);
        })
    },

    deleteOne: function(req, res) {
        const { id } = req.params;

        db.Character.destroy(
            {where: { id }}
        )
        .then(response => {
            console.log(response);
            res.send("Deleted one character");
        })
    }
}

module.exports = character;