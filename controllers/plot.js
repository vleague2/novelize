const express = require('express');
const db = require("./../models");
const he = require("he");

let plot = {

    // FIND ALL FUNCTION THAT WILL PING DATABASE
    findAll: function(req, res) {

        // PULL OUT THE STORY ID FROM THE URL PARAMETERS
        let storyId = req.params.storyid;
        console.log(storyId);

        // MAKE CALL TO THE DATABASE TO FIND ALL
        db.Plot.findAll({

            // WHERE THE STORY ID MATCHES 
            where: {
                StoryId: storyId
            },

            // ORDERED BY POSITION, WITH 1 APPEARING FIRST
            order: [
                ['position', 'ASC']
            ]
        }).then(plots => {

            // IF WE HAVE DATA COMING BACK FROM THE DB
            if (plots.length > 0) {
                // SERVER SIDE SANITIZATION - DECODING TO SEND BACK TO USER. IF THERE IS DATA IN THE FIELD, DECODE IT
                plots.forEach(plot => {
                    if (plot.title !== null) {
                        plot.title = he.decode(plot.title);
                    }
                    if (plot.plot_text !== null) {
                        plot.plot_text = he.decode(plot.plot_text);
                    }
                    
                })

                // SEND THE CHARACTERS TO THE FRONT-END
                res.send(plots);
            }

            // IF WE HAVE NO DATA FROM THE SERVER
            else {

                // SEND BACK AN EMPTY ARRAY
                res.send([]);
            }         
        })
    },

    // FUNCTION TO UPDATE A CHARACTER IN THE DB
    updateOne: function(req, res) {

        // PULL OUT THE PLOT'S ID FROM THE URL PARAMETERS
        let id = req.params.id;

        // PULL OUT THE COLUMN NAME FROM THE FRONT-END REQUEST
        let column_name = req.body.column;

        // PULL OUT THE CONTENT VALUE FROM THE FRONT-END REQUEST
        let content_update = req.body.content;
        
        // ENCODE THE CONTENT BEFORE WE PUT IT IN THE DB
        let encodedContent = he.encode(content_update);

        // MAKE DB CALL TO UPDATE
        db.Plot.update(

            // SEND THE COLUMN NAME AND ENCODED CONTENT
            {[column_name]: encodedContent},

            // WHERE THE IDS MATCH
            {where: {id:id}}
        )
        .then(response => {

            // SEND AN UPDATE TO THE FRONT-END
            console.log(response);
            res.send("updated one plot item!");
        })
    },

    // FUNCTION TO ADD A CHARACTER
    addOne: function(req, res) {

        // PULL PLOT TITLE FROM REQUEST BODY
        let plotTitle = req.body.title;

        // PULL PLOT BODY FROM REQUEST BODY
        let plotBody = req.body.plot;

        // PULL PLOT POSITION NUM FROM REQUEST BODY
        let plotPosition = req.body.position;

        // PULL STORY ID FROM THE REQUEST BODY
        let storyId = req.body.storyId

        // ENCODE THE DATA BEFORE SENDING IT INTO THE DB
        let encodedTitle = he.encode(plotTitle);
        let encodedBody = he.encode(plotBody);

        // CALL DB TO CREATE A PLOT WITH DATA
        db.Plot.create(
            {title: encodedTitle, plot_text: encodedBody, position: plotPosition, StoryId: storyId}
        )
        .then(response => {

            // SEND THE DATA BACK TO THE FRONT-END
            console.log(response.dataValues);
            res.send(response.dataValues);
        })
    },

    // FUNCTION TO DELETE A CHARACTER
    deleteOne: function(req, res) {

        // PULL ID FROM THE URL PARAMETERS
        let id = req.params.id;

        // SEND DB CALL TO DELETE
        db.Plot.destroy(

            // WHERE THE ID MATCHES
            {where: {id:id}}
        )
        .then(response => {
            
            // SEND A NOTE TO THE FRONT END THAT IT WAS DELETED
            console.log(response);
            res.send("Deleted one plot item!");
        })
    }
}

module.exports = plot;