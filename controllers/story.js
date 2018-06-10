const express = require('express');
const db = require("./../models");
const he = require('he');

let story = {
    findAll: function(req, res) {
        let userId = req.params.userid;

        db.Story.findAll({where: {UserId: userId}})
        .then(stories => {
            
            stories.forEach(story => {
                if (story.title !== null) {
                    story.title = he.decode(story.title)
                }
                if (story.story_text !== null) {
                    story.story_text = he.decode(story.story_text);
                }
            })

            res.send(stories);            
        })
    },

    findOne: function(req, res) {
        let id = req.params.id;

        db.Story.findOne({where: {id: id}})
        .then(story => {

            // SERVER SIDE SANITIZATION
            if (story.title !== null) {
                story.title = he.decode(story.title);
            }

            if (story.story_text !== null) {
                story.story_text = he.decode(story.story_text);
            }
            
            res.send(story);
        })
    },

    updateOne: function(req, res) {
        let content = req.body.content;
        let column = req.body.column;
        let id = req.params.id;

        let encodedContent = he.encode(content);
        
        db.Story.update(
            {[column]: encodedContent}, 
            {where: {id: id}})
        .then(response => {
            res.send("edited one story item!");
        })
    }
}

module.exports = story;