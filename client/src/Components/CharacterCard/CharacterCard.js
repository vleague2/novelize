import React from "react";
import "./CharacterCard.css";
import {Row, Col} from "../Grid";

/**
 * @deprecated in favor of ItemCard
 */

const CharacterCard = (props) => (
    <div className="card rounded-0">
        <div className="card-body" id={props.id}>
            <Row>
                <Col size="4">
                    <img src={props.image} className="char-img" alt={props.name}/>
                </Col>
                <Col size="8" p="pl-0">
                    <p className="char-name mb-1">{props.title}</p>
                    <p className="char-preview mb-1">{props.preview}</p>
                </Col>
            </Row>
            <Row>
                <Col size="12">
                    <p className="view-more text-right mb-0" data-toggle="collapse" data-target={`#collapse${props.id}`}>View More</p>

                    <p className="char-profile collapse" id={`collapse${props.id}`} dangerouslySetInnerHTML={{__html: props.profile}}></p>
                </Col>
            </Row>
        </div>
    </div>
)

export default CharacterCard;