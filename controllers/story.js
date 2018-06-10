const express = require('express');
const db = require("./../models");
const he = require('he');

let story = {
    findOne: function(req, res) {
        let id = req.params.id;

        db.Story.findOne({where: {id: id}})
        .then(story => {

            // SERVER SIDE SANITIZATION
            story.title = he.decode(story.title);
            story.story_text = he.decode(story.story_text);

            res.send(story);
        })
    },

    updateOne: function(req, res) {
        let storyUpdate = req.body.content;
        let id = req.params.id;

        let encodedStory = he.encode(storyUpdate);
        
        db.Story.update(
            {story_text: encodedStory}, 
            {where: {id: id}})
        .then(response => {
            // res.send(story);
            db.Story.findOne({where: {id: id}})
            .then(story => {
                res.send(story);
            })
        })
    }
}

module.exports = story;