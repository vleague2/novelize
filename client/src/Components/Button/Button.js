import React from "react";
import "./Button.css";

const Button = (props) => (
    <button type="button" className="btn submit-btns mb-3" onClick={props.onClick} id={props.id}>
        {props.children}
    </button>
);

export default Button;