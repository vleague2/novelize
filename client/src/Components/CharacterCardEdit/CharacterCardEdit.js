import React from "react";
import "./CharacterCardEdit.css";

const CharacterCardEdit = (props) => (
    <div className="card rounded-0 ml-1" id={props.id}>
        <div className="card-body">
            <div className="row">
                <div className="col-3">
                <img src={props.image} className="char_img" alt={props.name}/>
                </div>
                <div className="col-9 pl-0">
                    <p className="char_name mb-1">{props.title}</p>
                    <p className="char_preview mb-1">{props.preview}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <p className="edit-character text-right mb-0" onClick={props.onClick} id={props.id}>Edit</p>
                </div>
            </div>
        </div>
    </div>
)

export default CharacterCardEdit;