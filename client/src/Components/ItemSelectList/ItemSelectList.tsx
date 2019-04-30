import React from "react";
import "./ItemSelectList.css";
import { Col } from "../Grid";
import AddAnItem from "../AddAnItem";
import ItemCard from "../ItemCard";

type TItemSelectList = {
    items: any[],
    itemType: string,
    onClick: any,
    promptId: string,
    modalTarget: any,
}

const ItemSelectList = ( props: TItemSelectList ) => (
    <Col size={3} padding="pl-0 pr-0 mr-0" id="item-list-col">
        {props.items.map(item => {
            return <ItemCard
                id={item.id} 
                itemType={props.itemType}
                title={item.name || item.title}
                key={item.id} 
                onClick={props.onClick}
                isEditable={true}
                // @TODO not sure if null is the best here
                image={item.character_image || null}
                preview={item.preview_text || null}
            />
        })}

        <AddAnItem 
            id={props.promptId}
            target={props.modalTarget}
        >
            Add New  
        </AddAnItem>
    </Col>
);

export default ItemSelectList;