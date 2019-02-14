import React from "react";
import "./ItemSelectList.css";
import { Col } from "../Grid";
import AddAnItem from "../../Components/AddAnItem";

const ItemSelectList = ( props ) = (
    <Col size="4" p="pl-0 pr-0 mr-0" id="item-list-col">
        {props.items.map(item => {
            // @TODO this component doesn't even exist yet so....
            return <ItemEdit 
                id={item.id} 
                title={item.title} 
                key={item.id} 
                onClick={props.onClick}
                // @TODO not sure if null is the best here
                image={item.image || null}
                preview={item.preview || null}
            />
        })}

{/* @TODO this modal gonna need some help */}
        <AddAnItem 
            id="add-item-prompt"
            target="#add-item-modal"
        > 
            Add New 
        </AddAnItem>
    </Col>
);

export default ItemSelectList;