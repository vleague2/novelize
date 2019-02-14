import React from "react";
import "./FormFieldInput.css";

export const FormFieldInput = (props) => (
    <input 
        type="text" 
        className="form-control mt-2 mr-2 form-field-input" 
        id={props.id}  
        name={props.name} 
        placeholder={props.placeholder} 
        value={props.value} 
        onChange={props.onChange}
    />
)