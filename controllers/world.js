const express = require('express');
const db = require("./../models");

let world = {
    findAll: function(req, res) {
        let storyId = req.params.storyid;

        db.World.findAll({
            where: {StoryId: storyId}
        }).then(worlds => {
            res.send(worlds);
        })
    },

    updateOne: function(req, res) {
        let id = req.params.id;
        let column_name = req.body.column;
        let content_update = req.body.content;

        db.World.update(
            {[column_name]: content_update},
            {where: {id:id}}
        )
        .then(response => {
            console.log(response);
            res.send("updated one world item!");
        })
    },

    addOne: function(req, res) {
        let worldTitle = req.body.title;

        db.World.create(
            {title: worldTitle}
        )
        .then(response => {
            console.log(response);
            res.send("Added one world item!");
        })
    },

    deleteOne: function(req, res) {
        let id = req.params.id;

        db.World.destroy(
            {where: {id:id}}
        )
        .then(response => {
            console.log(response);
            res.send("Deleted one world item!");
        })
    }
}

module.exports = world;