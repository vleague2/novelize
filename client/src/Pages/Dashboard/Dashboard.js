import React, {Component} from "react";
import "./Dashboard.css";
import {Row, Col, Container} from "../../Components/Grid";
import API from "../../utils/API";
import StoryCard from "../../Components/StoryCard";
import {FormFieldInput} from "../../Components/Form";

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
        API.getAll("stories", "1")
        .then(res => {
            console.log(res);
            let data = res.data;

            data.forEach(story => {
                story.title = decodeURIComponent(story.title)
                story.story_text = decodeURIComponent(story.story_text);
            })

            this.setState({stories: data});

            console.log(this.state.stories);
        })
    }

    componentDidMount() {
        this.updateStoriesList();
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

    render() {
        return (
            <div>
                <Row id="story-dashboard-row">
                    {this.state.stories.map(story => {
                        return <StoryCard title={story.title} id={story.id} key={story.id} onClick={this.onClick} datatarget="#update-title-modal" modalClick={this.editTitle}/>
                    })}
                </Row>

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
    