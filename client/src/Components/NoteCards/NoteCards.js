import React from "react";
import "./NoteCards.css";

const NoteCard = (props) => (
    <div className="card rounded-0">
        <div className="card-body" id={props.id}>
           <p className="note-title mb-1">
            {props.title}
           </p>

           <p className="note-text">
            {props.text}
           </p>
        </div>
    </div>
)

export default NoteCard;