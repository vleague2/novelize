import React from "react";
import "./AddAnItem.css";

const AddAnItem = (props) => (
    <p className="justify-content-center text-center mt-4 mb-4 add-item-class" data-toggle="modal" data-target={props.target} id={props.id}>{props.children}<i className="fas fa-plus"></i></p>
)

export default AddAnItem;