import React from "react";
import "./CharacterCard.css";

const CharacterCard = (props) => (
    <div className="card rounded-0">
        <div className="card-body text-center" id={props.id}>
            <p id="feature-title">{props.title}</p>
            <p id="feature-descr">{props.preview}</p>
        </div>
    </div>
)

export default CharacterCard;