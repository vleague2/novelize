import React from "react";
import "./ItemSelectList.css";
import { Col } from "../Grid";
import AddAnItem from "../AddAnItem";
import ItemCard from "../ItemCard";
import { TCharacter } from "../../Pages/Characters/Characters";

type TItemSelectList = {
  items: TCharacter[];
  itemType: string;
  onEditClick: (id: number) => void;
  promptId: string;
  modalTarget: any;
  activeCharacter?: number;
};

const ItemSelectList = (props: TItemSelectList) => (
  <Col size={3} padding="pl-0 pr-0 mr-0" id="item-list-col">
    {props.items.map(item => {
      return (
        <ItemCard
          id={item.id}
          itemType={props.itemType}
          title={item.name}
          key={item.id}
          onEditClick={props.onEditClick}
          isEditable={true}
          // @TODO not sure if null is the best here
          image={item.character_image || null}
          preview={item.preview_text || null}
          active={item.id === props.activeCharacter}
        />
      );
    })}

    <AddAnItem id={props.promptId} target={props.modalTarget}>
      Add New
    </AddAnItem>
  </Col>
);

export default ItemSelectList;
