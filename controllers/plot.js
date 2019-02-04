const express = require('express');
const db = require("./../models");
const he = require("he");

const utils = require("../utils");

const plot = {
    findAll: function(req, res) {
        const { storyid } = req.params;

        db.Plot.findAll({
            where: {
                StoryId: storyid
            },
            order: [
                ['position', 'ASC']
            ]
        }).then(plots => {
            if (plots.length > 0) {
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
        const { id } = req.params;
        const { column, content } = req.body;
        
        if (column === 'title' && !content) {
            utils.sendEmptyFieldError(res);
            return;
        }

        const encodedContent = he.encode(content);

        db.Plot.update(
            {[column]: encodedContent},
            {where: { id }}
        )
        .then(response => {
            console.log(response);
            res.send("updated one plot item!");
        })
    },

    addOne: function(req, res) {
        const { title, plot, position, storyId } = req.body;

        if (!title) {
            utils.sendEmptyFieldError(res);
            return;
        }

        const newPlot = {
            title: he.encode(title),
            plot_text: he.encode(plot),
            position,
            StoryId: storyId
        }
        
        db.Plot.create(
            newPlot
        )
        .then(response => {
            console.log(response.dataValues);
            res.send(response.dataValues);
        })
    },

    deleteOne: function(req, res) {
        const { id } = req.params;

        db.Plot.destroy(
            {where: { id:id }}
        )
        .then(response => {
            console.log(response);
            res.send("Deleted one plot item!");
        })
    }
}

module.exports = plot;