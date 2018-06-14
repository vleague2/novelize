const express = require('express');
const db = require("./../models");
const he = require('he');
const passport = require('passport');



let story = {

    // FIND ALL FUNCTION THAT WILL PING DATABASE
    findAll: function(req, res) {

        // CONSOLE LOG WHICH USER IS IN SESSION
        console.log("user id in session: " + req.session.passport.user)

        // PULL OUT THE USER ID FROM THE CURRENT PASSPORT SESSION
        let userId = req.session.passport.user;

        // MAKE CALL TO THE DATABASE TO FIND ALL
        db.Story.findAll({where: {UserId: userId}})
        .then(stories => {
            
            // SERVER SIDE SANITIZATION - DECODING TO SEND BACK TO USER. IF THERE IS DATA IN THE FIELD, DECODE IT
            stories.forEach(story => {

                if (story.title !== null) {
                    story.title = he.decode(story.title)
                }
                if (story.story_text !== null) {
                    story.story_text = he.decode(story.story_text);
                }
            })

            // SEND THE STORIES TO THE FRONT-END
            res.send(stories);            
        })
    },

    // FUNCTION TO UPDATE A CHARACTER IN THE DB    
    findOne: function(req, res) {

        // PULL OUT THE STORY'S ID FROM THE URL PARAMETERS        
        let id = req.params.id;

        // MAKE DB CALL TO FIND THE STORY
        db.Story.findOne(
            {where: {id: id}}
        )
        .then(story => {

            // SERVER SIDE SANITIZATION - DECODE THE DATA IF IT EXISTS
            if (story.title !== null) {
                story.title = he.decode(story.title);
            }

            if (story.story_text !== null) {
                story.story_text = he.decode(story.story_text);
            }
            
            // SEND STORY BACK TO SERVER
            res.send(story);
        })
    },

    // FUNCTION TO DELETE A CHARACTER    
    addOne: function(req, res) {

        // PULL TITLE FROM THE REQUEST BODY        
        let title = req.body.title;

        // PULL USER ID FROM THE CURRENT PASSPORT SESSION
        let userId = req.session.passport.user;

        // ENCODE THE STORY TITLE BEFORE SENDING INTO DB
        let encodedTitle = he.encode(title);

        // SEND DB CALL TO CREATE STORY
        db.Story.create({

            // SEND IN TITLE AND USER ID
            title: title,
            UserId: userId
        })
        .then(response => {

            // SEND UPDATE TO FRONT-END
            res.send("Added a new story")
        })
    },

    // FUNCTION TO UPDATE A STORY IN THE DB    
    updateOne: function(req, res) {

        // PULL OUT THE CONTENT VALUE FROM THE FRONT-END REQUEST        
        let content = req.body.content;

        // PULL OUT THE COLUMN NAME FROM THE FRONT-END REQUEST        
        let column = req.body.column;

        // PULL OUT THE CHARACTER'S ID FROM THE URL PARAMETERS        
        let id = req.params.id;

        // ENCODE THE CONTENT BEFORE WE PUT IT IN THE DB        
        let encodedContent = he.encode(content);
        
        // MAKE DB CALL TO UPDATE        
        db.Story.update(

            // SEND THE COLUMN NAME AND ENCODED CONTENT            
            {[column]: encodedContent}, 
            {where: {id: id}})
        .then(response => {

            // SEND AN UPDATE TO THE FRONT-END     
            res.send("edited one story item!");
        })
    },

    // FUNCTION TO DELETE A STORY    
    deleteOne: function(req, res) {

        // PULL ID FROM THE URL PARAMETERS        
        let id = req.params.id;

        // SEND DB CALL TO DELETE        
        db.Story.destroy(

            // WHERE THE ID MATCHES            
            {where: {id: id}}
        )
        .then(response => {
            
            // SEND A NOTE TO THE FRONT END THAT IT WAS DELETED            
            res.send("Deleted one story item");
        })
    }
}

module.exports = story;