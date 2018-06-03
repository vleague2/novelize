import React from "react";
import "./Button.css";

const Button = ({ children }) => (
    <button type="button" className="btn submitBtns">
        {children}
    </button>
);

export default Button;