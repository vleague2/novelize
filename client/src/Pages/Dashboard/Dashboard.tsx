import React, { Component } from "react";
import "./Dashboard.css";
import { Row, Col } from "../../Components/Grid";
import API from "../../utils/API";
import StoryCard from "../../Components/StoryCard";
import { FormFieldInput } from "../../Components/Form";
import AddAnItem from "../../Components/AddAnItem";
import Modal from "../../Components/Modal";
import helpers from "../../utils/helpers";

type TStory = {
  id: number;
  title: string;
  story_text: string;
};

type TState = {
  user: string;
  stories: TStory[];
  delete: string;
};

class Dashboard extends Component {
  readonly state: TState = {
    user: "",
    stories: [],
    delete: ""
  };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.updateStoriesList();
  }

  updateStoriesList = () => {
    API.getAllStories().then(res => {
      // errors means the user isn't logged in
      // @TODO should this be in a catch?
      if (res.data.error) {
        window.location.href = "/login";
      } else {
        let data: TStory[] = res.data;

        if (data.length > 0) {
          data.forEach(story => {
            story.title = decodeURIComponent(story.title);
            story.story_text = decodeURIComponent(story.story_text);
          });

          this.setState({ stories: data });
        } else {
          this.forceAddStory();
        }
      }
    });
  };

  forceAddStory = () => {
    helpers.openModalForced("story");
  };

  onClick = (e: any) => {
    const name = e.target.name;
    const id = e.target.id;

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
        console.log("Error!");
    }
  };

  // ************ FUNCTION THAT RUNS WHEN THE USER EDITS THE TITLE OF THE STORY
  editTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    let id = parseInt(e.target.id, 10);

    let title;

    this.state.stories.forEach(story => {
      if (story.id == id) {
        title = story.title;
      }
    });

    // UPDATE THE MODAL TITLE INPUT FIELD TO THE TITLE VARIABLE
    // @ts-ignore

    document.getElementById("update-title-input").value = title;

    // SET THE MODAL'S DATA-ID TO THE ID WE PULLED SO WE CAN GRAB IT ON SAVE
    document
      .getElementById("update-title-save")
      .setAttribute("data-id", id.toString());
  };

  // ************** FUNCTION TO UPDATE THE TITLE & SAVE EDITS
  updateTitle = () => {
    // GRAB THE DATA ID OF THE MODAL
    let id = document
      .getElementById("update-title-save")
      .getAttribute("data-id");

    // GRAB THE TITLE FROM THE FORM INPUT
    // @ts-ignore

    let title = document.getElementById("update-title-input").value.trim();

    // API CALL TO UPDATE ONE ITEM, WITH THE DATA WE GOT
    API.updateOne("story", id, "title", title)
      .then(res => {
        console.log(res);

        // UDPATE THE STORY LIST
        this.updateStoriesList();
      })
      .catch(err => {
        console.log(err);
        // @TODO
        alert("Can't save empty story title!");
      });
  };

  // ************ FUNCTION TO HANDLE WHEN THE USER SAVES A NEW STORY
  addNewStory = () => {
    // IN THE EVENT THAT THE USER HAS JUST ADDED THEIR FIRST STORY, WE NEED TO FIX THE STUFF WE BROKE TO FORCE THEM TO ADD A STORY

    // ALLOW THE USER TO CLICK AWAY FROM THE MODAL
    document
      .getElementById("add-story-modal")
      .setAttribute("data-backdrop", "true");

    // ALLOW THE USER TO USE THE ESC KEY TO CLOSE IT
    document
      .getElementById("add-story-modal")
      .setAttribute("data-keyboard", "true");

    // SET MODAL TITLE BACK TO NORMAL
    document.getElementById("modal-title").innerHTML = "Add a story";

    // SHOW THE X BUTTON
    document.getElementById("x-button").style.display = "inline";

    // SHOW THE CLOSE BUTTON
    document.getElementById("close-button").style.display = "inline";

    // PULL OUT THE STORY TITLE FROM THE FORM
    // @ts-ignore
    let title = document.getElementById("add-title-input").value.trim();

    // PING THE DATABASE TO ADD A NEW WORLD
    API.addNewStory(title)
      .then(newStoryRes => {
        // PING THE DATABASE TO GET AN UPDATED WORLD LIST
        this.updateStoriesList();

        // EMPTY MODAL
        // @ts-ignore

        document.getElementById("add-title-input").value = "";
      })
      .catch(err => {
        console.log(err);
        // @TODO
        alert("Can't save empty story title!");
      });
  };

  // *********** FUNCTION TO PROMPT TO DELETE A STORY
  onDelete = e => {
    // GRAB ID FROM BUTTON CLICK SO WE KNOW WHAT STORY TO DELETE
    let id = e.target.id;

    // PUSH IT INTO STATE SO WE CAN GRAB IT IN THE CONFIRM DELETE
    this.setState({ delete: id });
  };

  // ************ FUNCTION THAT RUNS WHEN THE USER CONFIRMS THEY DO WANT TO DELETE THEIR STORY
  confirmDelete = () => {
    // PING API TO DELETE THE STORY, USING THE STATE VARIABLE AS THE ID
    API.deleteOne("story", this.state.delete).then(res => {
      // THEN UPDATE THE STORY LIST
      this.updateStoriesList();
    });
  };

  // *********** RENDER THINGS TO THE PAGE
  render() {
    return (
      // CONTAINER DIV
      <div>
        {/* ROW TO HOLD THE PAGE  */}
        <Row id="story-dashboard-row">
          {/* FULLWIDTH COLUMN TO HOLD THE ADD A STORY PROMPT */}
          <Col size={12}>
            {/* PROMPT TO ADD A STORY */}
            <AddAnItem id="add-story-prompt" target="#add-story-modal">
              {" "}
              Add a New Story{" "}
            </AddAnItem>

            {/* ANOTHER ROW, WHICH WILL HOLD OUR MAPPED-OUT STORIES */}
            <Row id="stories-row">
              {/* MAP THROUGH THE STORIES ARRAY */}
              {this.state.stories.map(story => {
                // RETURN A STORY CARD FOR EACH ONE
                return (
                  <StoryCard
                    title={story.title}
                    id={story.id}
                    key={story.id}
                    onClick={this.onClick}
                    datatarget="#update-title-modal"
                    modalClick={this.editTitle}
                    onDelete={this.onDelete}
                    onDeleteTarget="#delete-story-modal"
                  />
                );
              })}
            </Row>
          </Col>
        </Row>

        {/* MODAL FOR ADDING A NEW STORY */}
        <Modal
          id="add-story-modal"
          modalTitle="Add a Story"
          saveId="add-new-story"
          onClick={this.addNewStory}
        >
          {/* FORM FIELD TO ADD A NAME */}
          <div className="form-group">
            <label htmlFor="add-title-input" className="label-title">
              Title of Story
            </label>
            <FormFieldInput id="add-title-input" name="title" />
          </div>
        </Modal>

        {/* MODAL FOR UPDATING THE TITLE */}
        <Modal
          id="update-title-modal"
          modalTitle="Edit Story Title"
          saveId="update-title-save"
          onClick={this.updateTitle}
        >
          {/* FORM FIELD TO ADD A NAME */}
          <div className="form-group">
            <label htmlFor="update-title-input" className="label-title">
              Title{" "}
            </label>
            <FormFieldInput id="update-title-input" name="title" />
          </div>
        </Modal>

        {/* MODAL FOR CONFIRMING DELETE */}
        <Modal
          id="delete-story-modal"
          modalTitle="Are you sure?"
          saveId="delete-story-yes"
          onClick={this.confirmDelete}
          delBut="Yes"
        >
          <p>
            Once you delete this story, all of its data will be gone forever.
          </p>
        </Modal>
      </div>
    );
  }
}

export default Dashboard;
