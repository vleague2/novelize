const express = require('express');
const db = require("./../models");
const he = require("he");

let world = {

    // FIND ALL FUNCTION THAT WILL PING DATABASE    
    findAll: function(req, res) {

        // PULL OUT THE STORY ID FROM THE URL PARAMETERS        
        let storyId = req.params.storyid;

        // MAKE CALL TO THE DATABASE TO FIND ALL   
        db.World.findAll({

            // WHERE THE STORY ID MATCHES         
            where: {StoryId: storyId}
        }).then(worlds => {

            // IF WE HAVE DATA COMING BACK FROM THE DB            
            if (worlds.length > 0) {

                // SERVER SIDE SANITIZATION - DECODING TO SEND BACK TO USER. IF THERE IS DATA IN THE FIELD, DECODE IT
                worlds.forEach(world => {
                    if (world.title !== null) {
                        world.title = he.decode(world.title);
                    }
                    if (world.world_text !== null) {
                        world.world_text = he.decode(world.world_text);
                    }      
                })

                // SEND THE WORLDS TO THE FRONT-END                
                res.send(worlds);
            }

            // IF WE HAVE NO DATA FROM THE SERVER  
            else {

                // SEND BACK AN EMPTY ARRAY        
                res.send([]);
            }
        })
    },

    // FUNCTION TO UPDATE A WORLD IN THE DB    
    updateOne: function(req, res) {

        // PULL OUT THE WORLD'S ID FROM THE URL PARAMETERS
        let id = req.params.id;

        // PULL OUT THE COLUMN NAME FROM THE FRONT-END REQUEST
        let column_name = req.body.column;

        // PULL OUT THE CONTENT VALUE FROM THE FRONT-END REQUEST
        let content_update = req.body.content;

        // ENCODE THE CONTENT BEFORE WE PUT IT IN THE DB
        let encodedContent = he.encode(content_update);

        // MAKE DB CALL TO UPDATE
        db.World.update(

            // SEND THE COLUMN NAME AND ENCODED CONTENT
            {[column_name]: encodedContent},

            // WHERE THE IDS MATCH
            {where: {id:id}}
        )
        .then(response => {

            // SEND AN UPDATE TO THE FRONT-END
            console.log(response);
            res.send("updated one world item!");
        })
    },

    // FUNCTION TO ADD A WORLD
    addOne: function(req, res) {

        // PULL WORLD TITLE FROM REQUEST BODY
        let worldTitle = req.body.title;

        // PULL STORY ID FROM REQUEST BODY
        let storyId = req.body.storyId

        // ENCODE THE TITLE BEFORE WE PUSH TO DB
        let encodedTitle = he.encode(worldTitle)

        // CALL DB TO CREATE
        db.World.create(

            // SEND IN DATA
            {title: encodedTitle, StoryId: storyId}
        )
        .then(response => {

            // SEND RESPONSE TO FRONT END
            console.log(response.dataValues);
            res.send(response.dataValues);
        })
    },

    // FUNCTION TO DELETE A WORLD
    deleteOne: function(req, res) {

        // PULL ID FROM THE URL PARAMETERS
        let id = req.params.id;

        // SEND DB CALL TO DELETE
        db.World.destroy(

            // WHERE THE ID MATCHES
            {where: {id:id}}
        )
        .then(response => {

            // SEND NOTE TO THE FRONT END THAT WE'VE DELETED IT
            console.log(response);
            res.send("Deleted one world item!");
        })
    }
}

module.exports = world;