const express = require('express');
const db = require("./../models");
const he = require("he");

const world = {
    findAll: function(req, res) {
        const { storyid } = req.params;

        db.World.findAll({
            where: { StoryId: storyid }
        }).then(worlds => {
            if (worlds.length > 0) {
                worlds.forEach(world => {
                    if (world.title !== null) {
                        world.title = he.decode(world.title);
                    }

                    if (world.world_text !== null) {
                        world.world_text = he.decode(world.world_text);
                    }      
                })

                res.send(worlds);
            }

            else {
                res.send([]);
            }
        })
    },

    updateOne: function(req, res) {
        const { id } = req.params;
        const { column, content } = req.body;
    
        const encodedContent = he.encode(content);

        db.World.update(
            {[column]: encodedContent},
            {where: { id }}
        )
        .then(response => {
            console.log(response);
            res.send("updated one world item!");
        })
    },

    addOne: function(req, res) {
        const { title, storyId } = req.body;

        const encodedTitle = he.encode(title)

        db.World.create(
            {title: encodedTitle, StoryId: storyId}
        )
        .then(response => {
            console.log(response.dataValues);
            res.send(response.dataValues);
        })
    },

    deleteOne: function(req, res) {
        const { id } = req.params;

        db.World.destroy(
            {where: { id }}
        )
        .then(response => {
            console.log(response);
            res.send("Deleted one world item!");
        })
    }
}

module.exports = world;