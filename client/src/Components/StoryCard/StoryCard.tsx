import React from "react";
import "./StoryCard.css";
import { Row, Col } from "../Grid";
import Modal from "../Modal";
import { FormFieldInput } from "../Form";
import API from "../../utils/API";
import { StoryContext } from "../../App";

type TStoryCard = {
  id: number;
  title: string;
  refreshStories?: () => void;
};

const StoryCard = (props: TStoryCard) => {
  const [newTitle, setNewTitle] = React.useState<string>(props.title);

  const storyContext = React.useContext(StoryContext);

  const navigationButtons = [
    {
      text: "Characters",
      url: "/character-edit"
    },
    {
      text: "Plot",
      url: "/plot-edit"
    },
    {
      text: "Worldbuilding",
      url: "/world-edit"
    },
    {
      text: "Notes",
      url: "/notes-edit"
    }
  ];

  return (
    <>
      <Col size={5} margin="ml-auto mr-auto">
        <div className="card story-card mb-4">
          <div className="card-body">
            <h5 className="card-title story-card-title text-center">
              {props.title}
            </h5>
            <button
              className="btn btn-block mb-3 edit-story"
              onClick={e => {
                setActiveStory();
                navigateTo("/editor");
              }}
            >
              Open Story Editor
            </button>
            <p
              className="card-subtitle text-center mb-4 edit-story-title"
              id={props.id.toString()}
              data-toggle="modal"
              data-target={`#update-title-modal-${props.id}`}
            >
              Edit story title
            </p>
            <hr />
            <p className="card-text text-center mt-4">Jump to edit:</p>
            <Row>
              {navigationButtons.map(button => (
                <Col size={6} key={button.text}>
                  <button
                    className="btn btn-secondary btn-block quick-edit mt-3"
                    onClick={e => {
                      setActiveStory();
                      navigateTo(button.url);
                    }}
                  >
                    {button.text}
                  </button>
                </Col>
              ))}
            </Row>
            <Row>
              <Col size={12} id="delete-btn-story" align="text-right">
                <button
                  className="btn mt-4 mb-1 trash"
                  data-target={`#delete-story-modal-${props.id}`}
                  data-toggle="modal"
                >
                  <i className="far fa-trash-alt"></i>
                </button>
              </Col>
            </Row>
          </div>
        </div>
      </Col>

      <Modal
        id={`update-title-modal-${props.id}`}
        modalTitle="Edit Story Title"
        saveId="update-title-save"
        onClick={updateTitle}
      >
        <div className="form-group">
          <label htmlFor="update-title-input" className="label-title">
            Title
          </label>
          <FormFieldInput
            id={`update-title-input-${props.id}`}
            name="title"
            value={newTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewTitle(e.target.value)
            }
          />
        </div>
      </Modal>

      <Modal
        id={`delete-story-modal-${props.id}`}
        modalTitle="Are you sure?"
        saveId="delete-story-yes"
        onClick={confirmDelete}
        delBut="Yes"
      >
        <p>Once you delete this story, all of its data will be gone forever.</p>
      </Modal>
    </>
  );

  function updateTitle() {
    API.updateOne("story", props.id, "title", newTitle)
      .then(res => {
        console.log(res);

        props.refreshStories();
      })
      .catch(err => {
        console.log(err);
        // @TODO: send errors from API
        alert("Can't save empty story title!");
      });
  }

  function confirmDelete() {
    API.deleteOne("story", props.id).then(res => {
      props.refreshStories();
    });
  }

  function setActiveStory() {
    localStorage.setItem("currentStoryId", props.id.toString());
    storyContext.setStoryId(props.id);
  }

  function navigateTo(url: string) {
    window.location.href = url;
  }
};
export default StoryCard;
