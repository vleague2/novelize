import React from "react";
import "./WorldCardEdit.css";
import { Col } from "./../Grid";

const WorldCardEdit = (props) => (
    <div className="card rounded-0" id={props.id}>
        <div className="card-body">
            <p className="world-title mb-0">
                {props.title}
            </p>
            <div className="row">
                <Col size="12">
                    <p className="edit-world text-right mb-0" onClick={props.onClick} id={props.id}>Edit</p>
                </Col>
            </div>
        </div>
    </div>
)

export default WorldCardEdit;