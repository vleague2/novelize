import React from "react";
import "./Button.css";

const Button = ({ children }) => (
    <button type="button" className="btn">
        {children}
    </button>
);

export default Button;