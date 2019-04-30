import React from "react";
import "./PlotCard.css";
import {Row, Col} from "../Grid";

type TPlotCard = {
    id?: any,
    title?: any,
    children?: any,
}

const PlotCard = (props: TPlotCard) => (
    <Row id="timeline-row-editor-page">
        <Col size={1} id="line-col-editor-page">
            <div className="circle-editor-page"/>
        </Col>
        <Col size={10} id="plot-col-editor-page">
            <div className="card" id = {props.id}>
                <div className="card-body">
                    <h4 className="card-title timeline-title-editor-page">{props.title}</h4>
                    <p className="card-text timeline-text-editor-page">{props.children}</p>
                </div>
            </div>
        </Col>
    </Row>
)

export default PlotCard;