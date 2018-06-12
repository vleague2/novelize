import React from "react";
import "./Button.css";

const Button = (props) => (
    <button type="button" className={`btn ${props.className}`} onClick={props.onClick} id={props.id} data-dismiss={props.dataDismiss} aria-label={props.ariaLabel}>
        {props.children}
    </button>
);

export default Button;