const express = require('express');
const db = require("./../models");

let story = {
    findOne: function(req, res) {
        db.Story.findOne({where: {id: 1}})
        .then(story => {
            res.send(story);
        })
    },

    updateOne: function(req, res) {
        let storyUpdate = req.body.story;
        
        db.Story.update(
            {story_text: storyUpdate}, 
            {where: {id: 1}})
        .then(response => {
            // res.send(story);
            db.Story.findOne({where: {id: 1}})
            .then(story => {
                res.send(story);
            })
        })
    }
}

module.exports = story;