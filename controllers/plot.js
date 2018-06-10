const express = require('express');
const db = require("./../models");
const he = require("he");

let plot = {
    findAll: function(req, res) {
        let storyId = req.params.storyid;
        console.log(storyId);

        db.Plot.findAll({
            where: {
                StoryId: storyId
            },
            order: [
                ['position', 'ASC']
            ]
        }).then(plots => {

            if (plots.length > 0) {
                // SERVER SIDE SANITIZATION - DECODING TO SEND BACK TO USER
                plots.forEach(plot => {
                    if (plot.title !== null) {
                        plot.title = he.decode(plot.title);
                    }
                    if (plot.plot_text !== null) {
                        plot.plot_text = he.decode(plot.plot_text);
                    }
                    
                })

                res.send(plots);
            }

            else {
                res.send([]);
            }
             
        })
    },

    updateOne: function(req, res) {
        let id = req.params.id;
        let column_name = req.body.column;
        let content_update = req.body.content;
        
        let encodedContent = he.encode(content_update);

        db.Plot.update(
            {[column_name]: encodedContent},
            {where: {id:id}}
        )
        .then(response => {
            console.log(response);
            res.send("updated one plot item!");
        })
    },

    addOne: function(req, res) {
        let plotTitle = req.body.title;
        let plotBody = req.body.plot;
        let plotPosition = req.body.position;
        let storyId = req.body.storyId

        let encodedTitle = he.encode(plotTitle);
        let encodedBody = he.encode(plotBody);

        db.Plot.create(
            {title: encodedTitle, plot_text: encodedBody, position: plotPosition, StoryId: storyId}
        )
        .then(response => {
            console.log(response.dataValues);
            res.send(response.dataValues);
        })
    },

    deleteOne: function(req, res) {
        let id = req.params.id;

        db.Plot.destroy(
            {where: {id:id}}
        )
        .then(response => {
            console.log(response);
            res.send("Deleted one plot item!");
        })
    }
}

module.exports = plot;