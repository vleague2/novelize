const express = require('express');
const db = require("./../models");

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
            res.send(plots);
        })
    },

    updateOne: function(req, res) {
        let id = req.params.id;
        let column_name = req.body.column;
        let content_update = req.body.content;

        db.Plot.update(
            {[column_name]: content_update},
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

        console.log(plotTitle)
        console.log(plotBody)
        console.log(plotPosition)

        db.Plot.create(
            {title: plotTitle, plot_text: plotBody, position: plotPosition, StoryId: storyId}
        )
        .then(response => {
            console.log(response);
            res.send("Added one plot item!");
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