const express = require('express');
const db = require("./../models");
const he = require("he");

const utils = require("../utils");

const note = {
    findAll: function(req, res) {
        const { storyid } = req.params;

        db.Note.findAll({
            where: { StoryId: storyid }
        }).then(notes => {
            if (notes.length > 0) {
                notes.forEach(note => {
                    if (note.title !== null ) {
                        note.title = he.decode(note.title);
                    }

                    if (note.note_text !== null) {
                        note.note_text = he.decode(note.note_text);
                    } 
                })

                res.send(notes);
            }

            else {
                res.send([]);
            }
        })
    },

    updateOne: function(req, res) {
        const { id } = req.params;
        const { column, content } = req.body;
        const encoded_content = he.encode(content);

        if (column === 'title' && !content) {
            utils.sendEmptyFieldError(res);
            return;
        }

        db.Note.update(
            {[column]: encoded_content},
            {where: { id }}
        )
        .then(response => {
            console.log(response);
            res.send("updated one note item!");
        })
    },

    addOne: function(req, res) {
        const { title, storyId } = req.body;

        if (!title) {
            utils.sendEmptyFieldError(res);
            return;
        }

        const encodedTitle = he.encode(title);

        db.Note.create(
            {title: encodedTitle, StoryId: storyId}
        )
        .then(response => {
            console.log(response);
            res.send(response.dataValues);
        })
    },

    deleteOne: function(req, res) {
        const { id } = req.params;

        db.Note.destroy(
            {where: { id }}
        )
        .then(response => {
            console.log(response);
            res.send("Deleted one note!");
        })
    }
}

module.exports = note;