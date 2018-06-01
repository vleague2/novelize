import React from "react";
import "./Button.css";

const Button = ({ children }) => (
    <button type="button" class="btn">
        {children}
    </button>
);

export default Button;