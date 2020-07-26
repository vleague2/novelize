import React, { Component } from "react";
import "./Dashboard.css";
import { Row, Col } from "../../Components/Grid";
import API from "../../utils/API";
import StoryCard from "../../Components/StoryCard";
import { FormGroup } from "../../Components/Form";
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
  forceAddStory: boolean;
  newStoryTitle: string;
};

const Dashboard = () => {
  const [state, setState] = React.useState<TState>({
    user: "",
    stories: [],
    forceAddStory: false,
    newStoryTitle: ""
  });

  React.useEffect(() => {
    updateStoriesList();
  }, []);

  return (
    <>
      <Row id="story-dashboard-row">
        <Col size={12}>
          <AddAnItem id="add-story-prompt" target="#add-story-modal">
            Add a New Story
          </AddAnItem>

          <Row id="stories-row">
            {state.stories.map(story => {
              return (
                <StoryCard
                  title={story.title}
                  id={story.id}
                  key={story.id}
                  refreshStories={updateStoriesList}
                />
              );
            })}
          </Row>
        </Col>
      </Row>

      <Modal
        id="add-story-modal"
        modalTitle="Add a Story"
        saveId="add-new-story"
        onClick={addNewStory}
        canClose={!state.forceAddStory}
      >
        <FormGroup
          id="add-title-input"
          labelText="Title of Story"
          formName="title"
          value={state.newStoryTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setState({ ...state, newStoryTitle: e.target.value })
          }
        />
      </Modal>
    </>
  );

  function updateStoriesList() {
    API.getAllStories().then(res => {
      // errors means the user isn't logged in
      // @TODO should this be in a catch?
      if (res.data.error) {
        window.location.href = "/login";
      } else {
        const data: TStory[] = res.data;

        if (data.length > 0) {
          helpers.decode(data);

          setState({ ...state, stories: data });
        } else {
          setState({ ...state, forceAddStory: true });
          // @TODO: get off bootstrap lol
          document.getElementById("add-story-prompt").click();
        }
      }
    });
  }

  function addNewStory() {
    API.addNewStory(state.newStoryTitle)
      .then(newStoryRes => {
        updateStoriesList();
        setState({ ...state, forceAddStory: false, newStoryTitle: "" });
      })
      .catch(err => {
        console.log(err);
        // @TODO better error handling please
        alert("Can't save empty story title!");
      });
  }
};

export default Dashboard;
