import React, {Component} from "react";
import "./Dashboard.css";
import {Row, Col, Container} from "../../Components/Grid";
import API from "../../utils/API";
import StoryCard from "../../Components/StoryCard";
import {FormFieldInput} from "../../Components/Form";
import AddAnItem from "../../Components/AddAnItem";
import Button from "../../Components/Button";

// CREATE STATEFUL COMPONENT
class Dashboard extends Component {
    constructor(props) {
        super(props);

        // SET THE STATE
        this.state = {
            user: "",
            stories: [],
            delete: ""
        }
    }

// ********** FUNCTION TO UPDATE THE STORY LIST
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

// *********** AS SOON AS THE APP LOADS
    componentDidMount() {
        // UPDATE THE STORY LIST
        this.updateStoriesList();
    }

// ************* FUNCTION TO FORCE THE USER TO ADD A STORY
    forceAddStory = () => {

        // ALL OF THESE CHANGES WILL FORCE THE USER TO ADD A STORY IF THE ARRAY IS EMPTY BY MAKING THE MODAL UN-CLOSEABLE

        // DISABLE USER ABILITY TO CLICK AWAY FROM MODAL
        document.getElementById("add-story-modal").setAttribute("data-backdrop","static");

        // DISABLE MODAL CLOSE WITH THE ESCAPE KEY
        document.getElementById("add-story-modal").setAttribute("data-keyboard","false");

        // SIMULATE A CLICK ON THE ADD NOTE PROMPT
        document.getElementById("add-story-prompt").click();

        // CHANGE THE MODAL TITLE TO BE A LITTLE FRIENDLIER FOR A FIRST TIME USER
        document.getElementById("modal-title").innerHTML = "Add a new story!";

        // REMOVE THE X BUTTON
        document.getElementById("x-button").style.display = "none";

        // REMOVE THE CLOSE BUTTON
        document.getElementById("close-button").style.display = "none";
    }

// ********** WHEN THE USER CHOOSES A STORY TO EDIT OR ONE OF THE QUICK-EDITS
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

            // IF THEY CLICKED ON THE NOTES QUICK-EDIT
            case "notes":

                // REDIRECT TO THE NOTES QUICK-EDIT
                window.location.href = "/notes-edit";
                break;

            // IF NONE OF THOSE THINGS HAPPEN
            default:
                // APP IS BROKEN.....
                console.log("Error!")
        }
    }

// ************ FUNCTION THAT RUNS WHEN THE USER EDITS THE TITLE OF THE STORY
    editTitle = (e) => {

        // GRAB THE BUTTON ID FROM THE BUTTON CLICK
        let id = e.target.id;
        
        // INIT TITLE VARIABLE
        let title;

        // LOOP THROUGH THE STORIES ARRAY
        this.state.stories.forEach(story => {

            // IF THE STORY ID MATCHES THE SELECTED ID
            if (story.id == id) {

                // THEN THAT'S THE TITLE WE WANT
                title = story.title
            }
        })

        // UPDATE THE MODAL TITLE INPUT FIELD TO THE TITLE VARIABLE
        document.getElementById("update-title-input").value = title;

        // SET THE MODAL'S DATA-ID TO THE ID WE PULLED SO WE CAN GRAB IT ON SAVE
        document.getElementById("update-title-save").setAttribute('data-id', id);
    }

// ************** FUNCTION TO UPDATE THE TITLE & SAVE EDITS
    updateTitle = () => {

        // GRAB THE DATA ID OF THE MODAL
        let id = document.getElementById("update-title-save").getAttribute('data-id');

        // GRAB THE TITLE FROM THE FORM INPUT
        let title = document.getElementById("update-title-input").value.trim();

        // API CALL TO UPDATE ONE ITEM, WITH THE DATA WE GOT
        API.updateOne("story", id, "title", title)
        .then(res => {
            console.log(res);

            // UDPATE THE STORY LIST
            this.updateStoriesList();
        })
    }

// ************ FUNCTION TO HANDLE WHEN THE USER SAVES A NEW STORY
    addNewStory = () => {

        // IN THE EVENT THAT THE USER HAS JUST ADDED THEIR FIRST STORY, WE NEED TO FIX THE STUFF WE BROKE TO FORCE THEM TO ADD A STORY
       
            // ALLOW THE USER TO CLICK AWAY FROM THE MODAL
            document.getElementById("add-story-modal").setAttribute("data-backdrop","true");

            // ALLOW THE USER TO USE THE ESC KEY TO CLOSE IT
            document.getElementById("add-story-modal").setAttribute("data-keyboard","true");

            // SET MODAL TITLE BACK TO NORMAL
            document.getElementById("modal-title").innerHTML = "Add a story";

            // SHOW THE X BUTTON
            document.getElementById("x-button").style.display = "inline";

            // SHOW THE CLOSE BUTTON
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

// *********** FUNCTION TO PROMPT TO DELETE A STORY
    onDelete = (e) => {

        // GRAB ID FROM BUTTON CLICK SO WE KNOW WHAT STORY TO DELETE
        let id = e.target.id;

        // PUSH IT INTO STATE SO WE CAN GRAB IT IN THE CONFIRM DELETE
        this.setState({delete: id});
    }

// ************ FUNCTION THAT RUNS WHEN THE USER CONFIRMS THEY DO WANT TO DELETE THEIR STORY
    confirmDelete = () => {

        // PING API TO DELETE THE STORY, USING THE STATE VARIABLE AS THE ID
        API.deleteOne("story", this.state.delete)
        .then(res => {

            // THEN UPDATE THE STORY LIST
            this.updateStoriesList();
        })
    }

// *********** RENDER THINGS TO THE PAGE
    render() {
        return (

            // CONTAINER DIV
            <div>

                {/* ROW TO HOLD THE PAGE  */}
                <Row id="story-dashboard-row">

                    {/* FULLWIDTH COLUMN TO HOLD THE ADD A STORY PROMPT */}
                    <Col size="12">

                        {/* PROMPT TO ADD A STORY */}
                        <AddAnItem id="add-story-prompt" target=
                        "#add-story-modal"> Add a New Story </AddAnItem>
                    
                        {/* ANOTHER ROW, WHICH WILL HOLD OUR MAPPED-OUT STORIES */}
                        <Row id="stories-row">

                            {/* MAP THROUGH THE STORIES ARRAY */}
                            {this.state.stories.map(story => {

                                // RETURN A STORY CARD FOR EACH ONE
                                return <StoryCard title={story.title} id={story.id} key={story.id} onClick={this.onClick} datatarget="#update-title-modal" modalClick={this.editTitle} onDelete={this.onDelete} onDeleteTarget="#delete-story-modal"/>
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
                                <Button className="close" dataDismiss="modal" ariaLabel="Close">
                                    <span aria-hidden="true" id="x-button">&times;</span>
                                </Button>
                            </div>

                            {/* MODAL BODY */}
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
                                <Button className=" btn-secondary" dataDismiss="modal" id="close-button">Close</Button>


                                {/* SAVE THE CONTENT WHICH ALSO CLOSES THE MODAL */}
                                <Button className=" btn-save-modal" id="add-new-story" onClick={this.addNewStory} dataDismiss="modal">Save</Button>
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
                                <Button type="button" className="close" dataDismiss="modal" ariaLabel="Close">
                                    <span aria-hidden="true">&times;</span>
                                </Button>
                            </div>

                            {/* MODAL BODY */}
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
                                <Button className=" btn-secondary" dataDismiss="modal">Close</Button>

                                {/* SAVE THE CONTENT WHICH ALSO CLOSES THE MODAL */}
                                <Button  className=" btn-save-modal" id="update-title-save" onClick={this.updateTitle} dataDismiss="modal">Save</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MODAL FOR CONFIRMING DELETE */}
                <div className="modal fade" tabIndex="-1" role="dialog" id="delete-story-modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">

                                {/* MODAL TITLE */}
                                <h5 className="modal-title">Are you sure?</h5>

                                {/* X BUTTON SO YOU CAN CLOSE IT */}
                                <Button className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </Button>
                            </div>

                            {/* MODAL BODY */}
                            <div className="modal-body">
                                <p>Once you delete this story, all of its data will be gone forever.</p>
                            </div>

                            {/* BUTTONS AT MODAL BOTTOM */}
                            <div className="modal-footer">

                                {/* CLOSE THE MODAL */}
                                <Button className="btn-secondary" dataDismiss="modal">No</Button>

                                {/* SAVE THE CONTENT WHICH ALSO CLOSES THE MODAL */}
                                <Button className="btn-save-modal" id="delete-story-yes" onClick={this.confirmDelete} dataDismiss="modal">Yes</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
    