const express = require('express');
const db = require("./../models");

let story = {
    findOne: function(req, res) {
        let id = req.params.id;

        db.Story.findOne({where: {id: id}})
        .then(story => {
            res.send(story);
        })
    },

    updateOne: function(req, res) {
        let storyUpdate = req.body.story;
        let id = req.params.id;
        
        db.Story.update(
            {story_text: storyUpdate}, 
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