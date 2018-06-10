import axios from "axios";

export default {
    getAll: function(URL, id) {
        return axios.get(`/api/${URL}/` + id);
    },

    getOne: function(URL, id) {
        return axios.get(`/api/${URL}/` + id);
    },

    updateOne: function(URL, id, col, con) {
        let encodedCon = encodeURIComponent(con);

        return axios.post(`/api/${URL}/` + id, {
            column: col,
            content: encodedCon
        });
    },

    deleteOne: function(URL, id) {
        return axios.delete(`/api/${URL}/` + id);
    },

    addNewCharacter: function(name, preview, image, storyId) {
        let encodedName = encodeURIComponent(name);
        let encodedPreview = encodeURIComponent(preview);
        let encodedImage = encodeURIComponent(image);
        
        return axios.post("/api/new/character", {
            name: encodedName,
            preview: encodedPreview,
            image: encodedImage,
            storyId: storyId
        })
    },

    addNewWorld: function(title, storyId) {
        let encodedTitle = encodeURIComponent(title);

        return axios.post('/api/new/world', {
            title: encodedTitle,
            storyId: storyId
        })
    },

    addNewNote: function(title, storyId) {
        let encodedTitle = encodeURIComponent(title);

        return axios.post('/api/new/note', {
            title: encodedTitle,
            storyId: storyId
        })
    },

    addNewPlot: function(title, plot, position, storyId) {
        let encodedTitle = encodeURIComponent(title);
        let encodedPlot = encodeURIComponent(plot);

        return axios.post('/api/new/plot', {
            title: encodedTitle,
            plot: encodedPlot,
            position: position,
            storyId: storyId
        });
    },

    addNewStory: function(title) {
        let encodedTitle = encodeURIComponent(title);

        return axios.post('/api/new/story', {
            title: encodedTitle,
        })
    },

    getAllStories: function() {
        return axios.get(`/api/stories/`);
    },

    registerUser: function(email, password) {
        let encodedPassword = encodeURIComponent(password);

        return axios.post('/register', {
            email: email,
            password: encodedPassword
        })
    },

    loginUser: function(email, password) {
        let encodedPassword = encodeURIComponent(password);

        console.log(email)
        console.log(password)

        return axios.post('/auth/login', {
            email: email,
            password: password
        })
    }
}