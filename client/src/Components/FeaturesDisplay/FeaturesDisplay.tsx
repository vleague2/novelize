import React from "react";
import "./FeaturesDisplay.css";

type TFeaturesDisplay = {
    id?: any,
    title?: any,
    content?: any,
}

const FeaturesDisplay = (props: TFeaturesDisplay) => (
    <div className="card rounded-0 text-center" id="feature-display">
        <div className="card-body text-center justify-content-center feature-card" id={props.id}>
            <p id="feature-title" className="mt-3">{props.title}</p>
            <p id="feature-descr" className="mt-4">{props.content}</p>
        </div>
    </div>
)

export default FeaturesDisplay;