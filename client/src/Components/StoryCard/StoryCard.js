import React from "react";
import "./StoryCard.css";
import {Row, Col} from "../../Components/Grid";

const StoryCard = (props) => (
    <Col size="5" id="story-editor-col">
        <div className="card story-card" id={props.id}>
            <div className="card-body">
                <h5 className="card-title story-card-title text-center">
                    {props.title} 
                </h5>
                <button className="btn btn-block mb-3 edit-story" id={props.id} onClick={props.onClick} name="story">Open Story Editor</button>
                <p className="card-subtitle text-center mb-4 edit-story-title" id={props.id} data-toggle="modal" data-target={props.datatarget} onClick={props.modalClick}>
                    Edit story title 
                </p>
                <hr/>
                <p className="card-text text-center mt-4">
                    Jump to edit:
                </p>
                <Row>
                    <Col size="6">
                        <button className="btn btn-secondary btn-block quick-edit" onClick={props.onClick} id={props.id} name="characters"> Characters </button>
                    </Col>
                    <Col size="6">
                        <button className="btn btn-secondary btn-block quick-edit" onClick={props.onClick} id={props.id} name="plot"> Plot </button>
                    </Col>
                </Row>
                <Row id="edit-story-button-row2">
                    <Col size="6">
                    <button className="btn btn-secondary btn-block quick-edit" onClick={props.onClick} id={props.id} name="world"> Worldbuilding </button>
                    </Col>
                    <Col size="6">
                    <button className="btn btn-secondary btn-block quick-edit" onClick={props.onClick} id={props.id} name="notes"> Notes </button>
                    </Col>
                </Row>  
            </div>
        </div>
    </Col>

)

export default StoryCard;