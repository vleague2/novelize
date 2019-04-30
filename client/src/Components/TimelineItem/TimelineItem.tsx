import React from "react";
import "./TimelineItem.css";
import {Row, Col} from "../Grid";

type TTimelineItem = {
    id?: any,
    title?: any,
    children?: any,
    target?: any,
    onEdit?: any,
    onDelete?: any,
}

const TimelineItem = (props: TTimelineItem) => (
    <Row id="timeline-row">
        <Col size={2} id="line-col">
            <div className="circle"/>
        </Col>
        <Col size={8} id="plot-col">
            <div className="card" id = {props.id}>
                <div className="card-body">
                    <h4 className="card-title timeline-title">{props.title}</h4>
                    <p className="card-text timeline-text">{props.children}</p>
                    <div className="text-right">
                        <button className="btn btn-sm btn-secondary mr-3" id={props.id} data-target={props.target} onClick={props.onEdit} data-toggle="modal">Edit</button>
                        <button className="btn btn-sm btn-danger mr-3" id={props.id} onClick={props.onDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </Col>
    </Row>
)

export default TimelineItem;