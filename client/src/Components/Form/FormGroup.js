import React from "react";
import "./FormGroup.css";
import { FormFieldInput } from "./../Form";

export const FormGroup = (props) => (
    <div className="form-group">
        <label htmlFor={props.id} className="label-title">{props.labelText}</label>
        <FormFieldInput id={props.id} name={props.formName} placeholder={props.placeholder} />
    </div>
)
