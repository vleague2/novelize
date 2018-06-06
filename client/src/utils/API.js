import axios from "axios";

export default {
    getAll: function(URL) {
        return axios.get(`/api/${URL}`);
    },

    updateOne: function(URL, id, col, con) {
        return axios.post(`/api/${URL}` + id, {
            column: col,
            content: con
        });
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
    }
}