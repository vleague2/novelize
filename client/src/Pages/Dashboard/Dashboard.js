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

    // FUNCTION TO UPDATE THE STORY LIST
    updateStoriesList = () => {
        // MAKE API CALL TO GET ALL STORIES (THE BACKEND WILL PULL OUT THE USER ID FROM THE SESSION)
        API.getAllStories()
        .then(res => {

            // IF THERE ARE ERRORS, THAT MEANS THE USER ISN'T LOGGED IN
            if (res.data.error) {

                // REDIRECT TO THE LOGIN PAGE SO THEY CAN GET THEMSELVES LOGGED IN
                window.location.href = "/login"
            }

            // IF THERE'S NO ERRORS, WE GOOD TO GO
            else {
                // GRAB THE DATA FROM THE RESPONSE
                let data = res.data;

                // IF WE HAVE DATA FROM THE DB
                if (data.length > 0) {

                    // LOOP THROUGH EACH ITEM IN THE DATA
                    data.forEach(story => {
                        // DECODE THE TITLE AND TEXT SO IT SHOWS UP NORMAL
                        story.title = decodeURIComponent(story.title)
                        story.story_text = decodeURIComponent(story.story_text);
                    })
        
                    // SET THE STATE WITH THE DATA ARRAY
                    this.setState({stories: data});
                }
                // IF NO DATA COMES BACK FROM THE ARRAY, THE USER NEEDS TO ADD A STORY!
                else {
                    // CALL THE FUNCTION TO FORCE THEM TO ADD A STORY
                    this.forceAddStory();

                    // SET THE STATE TO THE EMPTY ARRAY BECAUSE WHY NOT
                    this.setState({stories: data});
                }
            }
        })
    }

    // AS SOON AS THE APP LOADS
    componentDidMount() {
        // UPDATE THE STORY LIST
        this.updateStoriesList();
    }

    // FUNCTION TO FORCE THE USER TO ADD A STORY
    forceAddStory = () => {
        // ALL OF THESE CHANGES WILL FORCE THE USER TO ADD A STORY IF THE ARRAY IS EMPTY BY MAKING THE MODAL UN-CLOSEABLE
        document.getElementById("add-story-modal").setAttribute("data-backdrop","static");
        document.getElementById("add-story-modal").setAttribute("data-keyboard","false");
        document.getElementById("add-story-prompt").click();
        document.getElementById("modal-title").innerHTML = "Add a new story!";
        document.getElementById("x-button").style.display = "none";
        document.getElementById("close-button").style.display = "none";
    }

    // WHEN THE USER CHOOSES A STORY TO EDIT OR ONE OF THE QUICK-EDITS
    onClick = (e) => {
        // PULL THE NAME OF THE BUTTON AND THE ID OF THE BUTTON. NAME WILL TELL US WHAT THEY CLICKED AND ID WILL TELL US WHICH STORY IT'S ATTACHED TO
        let name = e.target.name;
        let id = e.target.id;

        // SET A LOCAL STORAGE ITEM TO THE STORY THEY CLICKED
        localStorage.setItem("currentStoryId", id);

        // LOGIC TO DECIDE WHAT TO DO WITH THE CLICK BASED ON THE BUTTON NAME
        switch (name) {
            // IF THEY CLICKED ON THE STORY EDIT BUTTON
            case "story":
                // REDIRECT TO THE MAIN EDITOR
                window.location.href = "/editor";
                break;
            // IF THEY CLICKED ON THE CHARACTER QUICK-EDIT
            case "characters":
                // REDIRECT TO THE CHARACTER EDIT PAGE
                window.location.href = "/character-edit";
                break;
            // IF THEY CLICKED ON THE PLOT QUICK-EDIT
            case "plot":
                // REDIRECT TO THE PLOT EDIT PAGE
                window.location.href = "/plot-edit";
                break;
            // IF THEY CLICKED ON THE WORLD QUICK-EDIT
            case "world":
                // REDIRECT TO THE WORLD QUICK-EDIT
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
        
        // PULL OUT THE STORY TITLE FROM THE FORM
        let title = document.getElementById("add-title-input").value.trim();
        
        // PING THE DATABASE TO ADD A NEW WORLD
        API.addNewStory(title)
        .then(newStoryRes => {

            // PING THE DATABASE TO GET AN UPDATED WORLD LIST
            this.updateStoriesList();
            
            // EMPTY MODAL
            document.getElementById("add-title-input").value = "";
        })
    }

    // FUNCTION TO DELETE A STORY
    onDelete = (e) => {
        // GRAB ID FROM BUTTON CLICK SO WE KNOW WHAT STORY TO DELETE
        let id = e.target.id;
        console.log(id);
        

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
                            return <StoryCard title={story.title} id={story.id} key={story.id} onClick={this.onClick} datatarget="#update-title-modal" modalClick={this.editTitle} onDelete={this.onDelete}/>
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
    