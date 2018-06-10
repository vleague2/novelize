import React, {Component} from "react";
import "./Dashboard.css";
import {Row, Col, Container} from "../../Components/Grid";
import API from "../../utils/API";
import StoryCard from "../../Components/StoryCard";
import {FormFieldInput} from "../../Components/Form";
import AddAnItem from "../../Components/AddAnItem";

class Dashboard extends Component {
    constructor(props) {
        super(props);

        // SET THE STATE
        this.state = {
            user: "",
            stories: []
        }
    }

    updateStoriesList = () => {
        let userId = sessionStorage.getItem("userId")
        API.getAll("stories", userId)
        .then(res => {
            console.log(res);
            let data = res.data;

            // IF WE HAVE DATA FROM THE DB
            if (data.length > 0) {
                data.forEach(story => {
                    story.title = decodeURIComponent(story.title)
                    story.story_text = decodeURIComponent(story.story_text);
                })
    
                this.setState({stories: data});
    
                console.log(this.state.stories);
            }
            // IF NOT
            else {
                this.forceAddStory();
                this.setState({stories: data});
            }
        })
    }

    componentDidMount() {
        this.updateStoriesList();
    }

    forceAddStory = () => {
        // ALL OF THESE CHANGES WILL FORCE THE USER TO ADD A STORY IF THE ARRAY IS EMPTY
        document.getElementById("add-story-modal").setAttribute("data-backdrop","static");
        document.getElementById("add-story-modal").setAttribute("data-keyboard","false");
        document.getElementById("add-story-prompt").click();
        document.getElementById("modal-title").innerHTML = "Add a new story!";
        document.getElementById("x-button").style.display = "none";
        document.getElementById("close-button").style.display = "none";
    }

    onClick = (e) => {
        console.log("clicked!");
        let name = e.target.name;
        let id = e.target.id;

        console.log(name);
        // console.log(id);

        localStorage.setItem("currentStoryId", id);

        switch (name) {
            case "story":
                window.location.href = "/editor";
                break;
            case "characters":
                window.location.href = "/character-edit";
                break;
            case "plot":
                window.location.href = "/plot-edit";
                break;
            case "world":
                window.location.href = "/world-edit";
                break;
            case "notes":
                window.location.href = "/notes-edit";
                break;
            default:
                console.log("cry a lot")
        }
    }

    editTitle = (e) => {
        let id = e.target.id;
        
        let title;

        this.state.stories.forEach(story => {
            if (story.id == id) {
                title = story.title
            }
        })

        document.getElementById("update-title-input").value = title;

        // SET THE MODAL'S DATA-ID TO THE ID WE PULLED SO WE CAN GRAB IT ON SAVE
        document.getElementById("update-title-save").setAttribute('data-id', id);
    }

    updateTitle = () => {
        // GRAB THE DATA ID OF THE MODAL
        let id = document.getElementById("update-title-save").getAttribute('data-id');

        // GRAB THE TITLE FROM THE FORM INPUT
        let title = document.getElementById("update-title-input").value.trim();

        // API CALL TO UPDATE ONE ITEM, WITH THE DATA WE GOT
        API.updateOne("story", id, "title", title)
        .then(res => {
            console.log(res);

            this.updateStoriesList();
        })
    }

    // FUNCTION TO HANDLE WHEN THE USER SAVES A NEW STORY
    addNewStory = () => {

        // IN THE EVENT THAT THE USER HAS JUST ADDED THEIR FIRST STORY, WE NEED TO FIX THE STUFF WE BROKE TO FORCE THEM TO ADD A STORY
        document.getElementById("add-story-modal").setAttribute("data-backdrop","true");
        document.getElementById("add-story-modal").setAttribute("data-keyboard","true");;
        document.getElementById("modal-title").innerHTML = "Add a story";
        document.getElementById("x-button").style.display = "inline";
        document.getElementById("close-button").style.display = "inline";

        // GRAB USER ID FROM LOCAL STORAGE
        let userId = sessionStorage.getItem("userId");

        console.log(userId);
        
        // PULL OUT THE STORY TITLE FROM THE FORM
        let title = document.getElementById("add-title-input").value.trim();
        
        // PING THE DATABASE TO ADD A NEW WORLD
        API.addNewStory(title, userId)
        .then(newStoryRes => {

            // PING THE DATABASE TO GET AN UPDATED WORLD LIST
            this.updateStoriesList();
            
            // EMPTY MODAL
            document.getElementById("add-title-input").value = "";
        })
    }

    render() {
        return (
            <div>
                <Row id="story-dashboard-row">
                    <Col size="12">
                        <AddAnItem id="add-story-prompt" target=
                        "#add-story-modal"> Add a New Story </AddAnItem>
                    
                        <Row id="stories-row">
                        {this.state.stories.map(story => {
                            return <StoryCard title={story.title} id={story.id} key={story.id} onClick={this.onClick} datatarget="#update-title-modal" modalClick={this.editTitle}/>
                        })}
                        </Row>
                    </Col>
                </Row>

                {/* MODAL FOR ADDING A NEW STORY */}
                <div className="modal fade" tabIndex="-1" role="dialog" id="add-story-modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                {/* MODAL TITLE */}
                                <h5 className="modal-title" id="modal-title">Add a Story</h5>
                                {/* X BUTTON SO YOU CAN CLOSE IT */}
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" id="x-button">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* FORM FIELD TO ADD A NAME */}
                                <div className="form-group">
                                    <label htmlFor="add-title-input" className="label-title" >Title of Story</label>
                                    <FormFieldInput id="add-title-input" name="title" />
                                </div>
                            </div>
                            {/* BUTTONS AT MODAL BOTTOM */}
                            <div className="modal-footer">
                                {/* CLOSE THE MODAL */}
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" id="close-button">Close</button>
                                {/* SAVE THE CONTENT WHICH ALSO CLOSES THE MODAL */}
                                <button type="button" className="btn btn-save-modal" id="add-new-story" onClick={this.addNewStory} data-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MODAL FOR UPDATING THE TITLE */}
                <div className="modal fade" tabIndex="-1" role="dialog" id="update-title-modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                {/* MODAL TITLE */}
                                <h5 className="modal-title">Edit Story Title</h5>
                                {/* X BUTTON SO YOU CAN CLOSE IT */}
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* FORM FIELD TO ADD A NAME */}
                                <div className="form-group">
                                    <label htmlFor="update-title-input" className="label-title">Title </label>
                                    <FormFieldInput id="update-title-input" name="title"/>
                                </div>
                            </div>
                            {/* BUTTONS AT MODAL BOTTOM */}
                            <div className="modal-footer">
                                {/* CLOSE THE MODAL */}
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                {/* SAVE THE CONTENT WHICH ALSO CLOSES THE MODAL */}
                                <button type="button" className="btn btn-save-modal" id="update-title-save" onClick={this.updateTitle} data-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
    