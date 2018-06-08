import axios from "axios";

export default {
    getAll: function(URL) {
        return axios.get(`/api/${URL}`);
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

    addNewCharacter: function(name, preview, image) {
        return axios.post("/api/new/character", {
            name: name,
            preview: preview,
            image: image
        })
    },

    addNewWorld: function(title) {
        return axios.post('/api/new/world', {
            // SEND IN THE COLUMN AND CONTENT
            title: title
        })
    },

    addNewNote: function(title) {
        return axios.post('/api/new/note', {
            title: title
        })
    },

    addNewPlot: function(title, plot, position) {
        return axios.post('/api/new/plot', {
            title: title,
            plot: plot,
            position: position
        });
    }
}