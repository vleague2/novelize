import axios from "axios";

export default {
    getAll: function(URL, id) {
        return axios.get(`/api/${URL}/` + id);
    },

    getOne: function(URL, id) {
        return axios.get(`/api/${URL}/` + id);
    },

    updateOne: function(URL, id, col, con) {
        return axios.post(`/api/${URL}/` + id, {
            column: col,
            content: con
        });
    },

    deleteOne: function(URL, id) {
        return axios.delete(`/api/${URL}/` + id);
    },

    addNewCharacter: function(name, preview, image, storyId) {
        return axios.post("/api/new/character", {
            name: name,
            preview: preview,
            image: image,
            storyId: storyId
        })
    },

    addNewWorld: function(title, storyId) {
        return axios.post('/api/new/world', {
            // SEND IN THE COLUMN AND CONTENT
            title: title,
            storyId: storyId
        })
    },

    addNewNote: function(title, storyId) {
        return axios.post('/api/new/note', {
            title: title,
            storyId: storyId
        })
    },

    addNewPlot: function(title, plot, position, storyId) {
        return axios.post('/api/new/plot', {
            title: title,
            plot: plot,
            position: position,
            storyId: storyId
        });
    }
}