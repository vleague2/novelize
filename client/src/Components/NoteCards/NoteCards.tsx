import React from "react";
import "./NoteCards.css";

type TNoteCard = {
    id?: any,
    title?: any,
    text?: any,
}

const NoteCard = (props: TNoteCard) => (
    <div className="card rounded-0">
        <div className="card-body" id={props.id}>
           <p className="note-title mb-1">
            {props.title}
           </p>

           <p className="note-text" dangerouslySetInnerHTML={{__html: props.text}}></p>
        </div>
    </div>
)

export default NoteCard;