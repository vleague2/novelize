import React from "react";
import "./FeaturesDisplay.css";

const FeaturesDisplay = (props) => (
    <div className="card rounded-0" id="feature-display">
        <div className="card-body text-center" id={props.id}>
            <p id="feature-title">{props.title}</p>
            <p id="feature-descr">{props.content}</p>
        </div>
    </div>
)

export default FeaturesDisplay;