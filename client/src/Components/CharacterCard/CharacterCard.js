import React from "react";
import "./CharacterCard.css";

const CharacterCard = (props) => (
    <div className="card rounded-0">
        <div className="card-body" id={props.id}>
            <div className="row">
                <div className="col-4">
                <img src={props.image} className="char-img" alt={props.name}/>
                </div>
                <div className="col-8 pl-0">
                    <p className="char-name mb-1">{props.title}</p>
                    <p className="char-preview mb-1">{props.preview}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <p className="view-more text-right mb-0" data-toggle="collapse" data-target={`#collapse${props.id}`}>View More</p>

                    <p className="char-profile collapse" id={`collapse${props.id}`} dangerouslySetInnerHTML={{__html: props.profile}}></p>
                </div>
            </div>
        </div>
    </div>
)

export default CharacterCard;