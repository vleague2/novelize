const express = require('express');
const db = require("./../models");
const he = require('he');
const passport = require('passport');

const story = {
    findAll: function(req, res) {
        console.log("user id in session: " + req.session.passport.user)

        const userId = req.session.passport.user;

        db.Story.findAll({where: { UserId: userId }})
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
        const { id } = req.params;

        db.Story.findOne(
            {where: { id }}
        )
        .then(story => {
            if (story.title !== null) {
                story.title = he.decode(story.title);
            }

            if (story.story_text !== null) {
                story.story_text = he.decode(story.story_text);
            }
            
            res.send(story);
        })
    },

    addOne: function(req, res) {
        const { title } = req.body;

        const userId = req.session.passport.user;

        const encodedTitle = he.encode(title);

        db.Story.create({
            title: encodedTitle,
            UserId: userId
        })
        .then(response => {
            res.send("Added a new story")
        })
    },

    updateOne: function(req, res) {
        const { content, column } = req.body;
        const { id } = req.params;

        const encodedContent = he.encode(content);
        
        db.Story.update(
            {[column]: encodedContent}, 
            {where: { id }})
        .then(response => {
            res.send("edited one story item!");
        })
    },

    deleteOne: function(req, res) {
        const { id } = req.params;

        db.Story.destroy(
            {where: { id }}
        )
        .then(response => {
            res.send("Deleted one story item");
        })
    }
}

module.exports = story;