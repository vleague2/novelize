const express = require('express');
const db = require("./../models");
const he = require("he");


let note = {

    // FIND ALL FUNCTION THAT WILL PING DATABASE
    findAll: function(req, res) {

        // PULL OUT THE STORY ID FROM THE URL PARAMETERS
        let storyId = req.params.storyid

        // MAKE CALL TO THE DATABASE TO FIND ALL
        db.Note.findAll({

            // WHERE THE STORY ID MATCHES
            where: {StoryId: storyId}
        }).then(notes => {
            
            // IF WE HAVE DATA COMING BACK FROM THE DB
            if (notes.length > 0) {

                // SERVER SIDE SANITIZATION - DECODING TO SEND BACK TO USER. IF THERE IS DATA IN THE FIELD, DECODE IT
                notes.forEach(note => {
                    if (note.title !== null ) {
                        note.title = he.decode(note.title);
                    }
                    if (note.note_text !== null) {
                        note.note_text = he.decode(note.note_text);
                    } 
                    
                })

                // SEND THE NOTES TO THE FRONT-END
                res.send(notes);
            }

            // IF WE HAVE NO DATA FROM THE SERVER
            else {

                // SEND BACK AN EMPTY ARRAY
                res.send([]);
            }
            
        })
    },

    // FUNCTION TO UPDATE A NOTE IN THE DB
    updateOne: function(req, res) {

        // PULL OUT THE NOTE'S ID FROM THE URL PARAMETERS
        let id = req.params.id;

        // PULL OUT THE COLUMN NAME FROM THE FRONT-END REQUEST
        let column_name = req.body.column;

        // PULL OUT THE CONTENT VALUE FROM THE FRONT-END REQUEST
        let content_update = req.body.content;

        // ENCODE THE CONTENT BEFORE WE PUT IT IN THE DB 
        let encoded_content = he.encode(content_update);

        // MAKE DB CALL TO UPDATE
        db.Note.update(

            // SEND THE COLUMN NAME AND ENCODED CONTENT
            {[column_name]: encoded_content},

            // WHERE THE IDS MATCH
            {where: {id:id}}
        )
        .then(response => {
            console.log(response);
            // SEND AN UPDATE TO THE FRONT-END
            res.send("updated one note item!");
        })
        
    },

    // FUNCTION TO ADD A CHARACTER
    addOne: function(req, res) {

        // PULL OUT NOTE TITLE FROM REQUEST BODY
        let noteTitle = req.body.title;

        // PULL STORY ID FROM THE REQUEST BODY
        let storyId = req.body.storyId;

        // ENCODE THE DATA BEFORE SENDING IT INTO THE DB
        let encodedTitle = he.encode(noteTitle);

        // CALL DB TO CREATE A NOTE WITH DATA
        db.Note.create(
            {title: encodedTitle, StoryId: storyId}
        )
        .then(response => {
            console.log(response);

            // SEND THE DATA BACK TO THE FRONT-END
            res.send(response.dataValues);
        })
    },

    // FUNCTION TO DELETE A CHARACTER
    deleteOne: function(req, res) {

        // PULL ID FROM THE URL PARAMETERS
        let id = req.params.id;

        // SEND DB CALL TO DELETE
        db.Note.destroy(

            // WHERE THE ID MATCHES
            {where: {id:id}}
        )
        .then(response => {

            // SEND A NOTE TO THE FRONT END THAT IT WAS DELETED
            console.log(response);
            res.send("Deleted one note!");
        })
    }
}

module.exports = note;