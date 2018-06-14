const express = require('express');
const db = require("./../models");
const he = require("he");

// CREATE A CHARACTER OBJECT
let character = {

    // FIND ALL FUNCTION THAT WILL PING DATABASE
    findAll: function(req, res) {

        // PULL OUT THE STORY ID FROM THE URL PARAMETERS
        let storyId = req.params.storyid;

        // MAKE CALL TO THE DATABASE TO FIND ALL
        db.Character.findAll({

            // WHERE THE STORY ID MATCHES 
            where: {StoryId: storyId}
        }).then(characters => {

            // IF WE HAVE DATA COMING BACK FROM THE DB
            if (characters.length > 0 ) {

                // SERVER SIDE SANITIZATION - DECODING TO SEND BACK TO USER. IF THERE IS DATA IN THE FIELD, DECODE IT
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

                // SEND THE CHARACTERS TO THE FRONT-END
                res.send(characters);
            }

            // IF WE HAVE NO DATA FROM THE SERVER
            else {

                // SEND BACK AN EMPTY ARRAY
                res.send([]);
            }  
        })
    },

    // FUNCTION TO UPDATE A CHARACTER IN THE DB
    updateOne: function(req, res) {

        // PULL OUT THE CHARACTER'S ID FROM THE URL PARAMETERS
        let id = req.params.id;

        // PULL OUT THE COLUMN NAME FROM THE FRONT-END REQUEST
        let column_name = req.body.column;

        // PULL OUT THE CONTENT VALUE FROM THE FRONT-END REQUEST
        let content_update = req.body.content;

        // ENCODE THE CONTENT BEFORE WE PUT IT IN THE DB
        let encodedContent = he.encode(content_update);

        // MAKE DB CALL TO UPDATE
        db.Character.update(

            // SEND THE COLUMN NAME AND ENCODED CONTENT
            {[column_name]: encodedContent},

            // WHERE THE IDS MATCH
            {where: {id:id}}
        )
        .then(response => {
            
            // SEND AN UPDATE TO THE FRONT-END
            res.send("updated one character!");
            console.log("updated one character")
        })
    },

    // FUNCTION TO ADD A CHARACTER
    addOne: function(req, res) {

        // PULL CHARACTER NAME FROM REQUEST BODY
        let characterName = req.body.name;

        // PULL CHARACTER PREVIEW TEXT FROM REQUEST BODY
        let characterPreview = req.body.preview;

        // PULL CHARACTER IMAGE FROM REQUEST BODY
        let characterImage = req.body.image;

        // PULL STORY ID FROM THE REQUEST BODY
        let storyId = req.body.storyId

        // ENCODE THE DATA BEFORE SENDING IT INTO THE DB
        let encodedName = he.encode(characterName);
        let encodedPreview = he.encode(characterPreview);
        let encodedImage = he.encode(characterImage);

        // CALL DB TO CREATE A CHARACTER WITH DATA
        db.Character.create(
            {name: encodedName, preview_text: encodedPreview, character_image: encodedImage, StoryId: storyId}
        )
        .then(response => {

            // SEND THE DATA BACK TO THE FRONT-END
            console.log(response.dataValues);
            res.send(response.dataValues);
        })
    },

    // FUNCTION TO DELETE A CHARACTER
    deleteOne: function(req, res) {

        // PULL ID FROM THE URL PARAMETERS
        let id = req.params.id;

        // SEND DB CALL TO DELETE
        db.Character.destroy(

            // WHERE THE ID MATCHES
            {where: {id:id}}
        )
        .then(response => {

            // SEND A NOTE TO THE FRONT END THAT IT WAS DELETED
            console.log(response);
            res.send("Deleted one character");
        })
    }
}

module.exports = character;