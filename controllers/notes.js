const express = require('express');
const db = require("./../models");
const he = require("he");


let note = {
    findAll: function(req, res) {

        let storyId = req.params.storyid

        db.Note.findAll({
            where: {StoryId: storyId}
        }).then(notes => {
            
            // SERVER SIDE SANITIZATION - DECODING TO SEND BACK TO USER
            notes.forEach(note => {
                if (note.title !== null ) {
                    note.title = he.decode(note.title);
                }
                if (note.note_text !== null) {
                    note.note_text = he.decode(note.note_text);
                } 
                
            })

            res.send(notes);
        })
    },

    updateOne: function(req, res) {
        let id = req.params.id;
        let column_name = req.body.column;
        let content_update = req.body.content;

        // SERVER SIDE SANITIZATION 
        let encoded_content = he.encode(content_update);

        db.Note.update(
            {[column_name]: encoded_content},
            {where: {id:id}}
        )
        .then(response => {
            console.log(response);
            res.send("updated one note item!");
        })
        
    },

    addOne: function(req, res) {
        let noteTitle = req.body.title;
        let storyId = req.body.storyId;

        let encodedTitle = he.encode(noteTitle);

        db.Note.create(
            {title: encodedTitle, StoryId: storyId}
        )
        .then(response => {
            console.log(response);
            res.send("Added one note item!");
        })
    },

    deleteOne: function(req, res) {
        let id = req.params.id;

        db.Note.destroy(
            {where: {id:id}}
        )
        .then(response => {
            console.log(response);
            res.send("Deleted one note!");
        })
    }
}

module.exports = note;