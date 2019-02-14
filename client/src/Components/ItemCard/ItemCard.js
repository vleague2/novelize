import React from "react";
import { Row, Col } from "../Grid";
import "./ItemCard.css";

const ItemCard = ( props ) => {
    function getLinkText() {
        if (props.isEditable) {
            return (
                <p className="edit-item text-right mb-0" onClick={props.onClick} id={props.id}>Edit</p>
            )
        }
    
        return (
            <div>
                <p className="view-more text-right mb-0" data-toggle="collapse" data-target={`#collapse${props.id}`}>View More</p>
    
                <p className="collapsible-text collapse" id={`collapse${props.id}`} dangerouslySetInnerHTML={{__html: props.text}}></p>
            </div>
            
        )
    }

    return (
        <div className="card rounded-0" id={props.id}>
            <div className="card-body">
                <Row>
                    <Col size="4">
                    {/* @TODO consider conditional rendering this entire column for blank image */}
                        {props.image && 
                            <img src={props.image} className="item-image" alt={props.title}/>
                        }
                    </Col>
                    <Col size="8" p="pl-0">
                        <p className="primary-text mb-1">{props.title}</p>
                        <p className="secondary-text mb-1">{props.preview}</p>
                    </Col>
                </Row>
                <Row>
                    <Col size="12">
                        { getLinkText() }
                    </Col>
                </Row>
            </div>
        </div>
    )
};

export default ItemCard;