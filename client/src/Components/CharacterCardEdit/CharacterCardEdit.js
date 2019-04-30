import React from "react";
import "./CharacterCardEdit.css";
import {Row, Col} from "../Grid";

/**
 * @deprecated in favor of ItemCard  
 */ 
const CharacterCardEdit = (props) => (
    <div className="card rounded-0" id={props.id}>
        <div className="card-body">
            <Row>
                <Col size="3">
                    <img src={props.image} className="char-img" alt={props.name}/>
                </Col>
                <Col size="9" p="pl-0">
                    <p className="char-name mb-1">{props.title}</p>
                    <p className="char-preview mb-1">{props.preview}</p>
                </Col>
            </Row>
            <Row>
                <Col size="12">
                    <p className="edit-character text-right mb-0" onClick={props.onClick} id={props.id}>Edit</p>
                </Col>
            </Row>
        </div>
    </div>
)

export default CharacterCardEdit;