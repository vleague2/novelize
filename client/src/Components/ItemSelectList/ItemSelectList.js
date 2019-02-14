import React from "react";
import "./ItemSelectList.css";
import { Col } from "../Grid";
import AddAnItem from "../../Components/AddAnItem";
// import CharacterCardEdit from "../CharacterCardEdit";
import ItemCard from "../ItemCard";

const ItemSelectList = ( props ) => (
    <Col size="4" p="pl-0 pr-0 mr-0" id="item-list-col">
        {props.items.map(item => {
            // @TODO this component needs to be generic
            return <ItemCard
                id={item.id} 
                title={item.name}
                key={item.id} 
                onClick={props.onClick}
                isEditable={true}
                // @TODO not sure if null is the best here
                image={item.character_image || null}
                preview={item.preview_text || null}
            />
        })}

        <AddAnItem 
            id={props.modalId}
            target={props.modalTarget}
        >
            Add New  
        </AddAnItem>
    </Col>
);

export default ItemSelectList;