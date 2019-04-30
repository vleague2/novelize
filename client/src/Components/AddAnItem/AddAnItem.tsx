import React from "react";
import "./AddAnItem.css";

type TAddAnItem = {
    target?: any,
    id?: any,
    children?: any,
}

const AddAnItem = (props: TAddAnItem) => (
    <p className="justify-content-center text-center mt-4 mb-4 add-item-class" data-toggle="modal" data-target={props.target} id={props.id}>{props.children}&nbsp;<i className="fas fa-plus"></i></p>
)

export default AddAnItem;