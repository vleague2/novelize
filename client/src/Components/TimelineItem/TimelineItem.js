import React from "react";
import "./TimelineItem.css";
import {Row, Col} from "../../Components/Grid";

const TimelineItem = (props) => (
    <Row id="timeline-row">
        <Col size="2" id="line-col">
            <div className="circle"/>
        </Col>
        <Col size="8" id="plot-col">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">{props.title}</h4>
                    <p className="card-text">{props.children}</p>
                </div>
            </div>
        </Col>
    </Row>
)

export default TimelineItem;