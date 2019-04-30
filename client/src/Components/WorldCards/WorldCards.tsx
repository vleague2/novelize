import React from "react";
import "./WorldCards.css";

type TWorldCard = {
    id?: any,
    title?: any,
    descr?: any,
}

const WorldCard = (props: TWorldCard) => (
    <div className="card rounded-0">
        <div className="card-body" id={props.id}>
           <p className="world-title mb-0">
            {props.title}
           </p>
           <p className="view_more text-right mb-0" data-toggle="collapse" data-target={`#collapseworld${props.id}`}>View More</p>

           <p className="world-descr collapse" id={`collapseworld${props.id}`} dangerouslySetInnerHTML={{__html: props.descr}}>
           </p>
        </div>
    </div>
)

export default WorldCard;