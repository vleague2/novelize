const express = require('express');
const db = require("./../models");
const he = require("he");

let world = {
    findAll: function(req, res) {
        let storyId = req.params.storyid;

        db.World.findAll({
            where: {StoryId: storyId}
        }).then(worlds => {

            // SERVER SIDE SANITIZATION - DECODING TO SEND BACK TO USER
            worlds.forEach(world => {
                world.title = he.decode(world.title);
                world.world_text = he.decode(world.world_text);
            })

            res.send(worlds);
        })
    },

    updateOne: function(req, res) {
        let id = req.params.id;
        let column_name = req.body.column;
        let content_update = req.body.content;

        let encodedContent = he.encode(content_update);

        db.World.update(
            {[column_name]: encodedContent},
            {where: {id:id}}
        )
        .then(response => {
            console.log(response);
            res.send("updated one world item!");
        })
    },

    addOne: function(req, res) {
        let worldTitle = req.body.title;
        let storyId = req.body.storyId

        let encodedTitle = he.encode(worldTitle)

        db.World.create(
            {title: encodedTitle, StoryId: storyId}
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