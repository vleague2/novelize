import React from "react";
import "./FormGroup.css";
import { FormFieldInput } from ".";

type TFormGroup = {
    id?: string,
    labelText?: string,
    formName?: string,
    placeholder?: string,
}

export const FormGroup = (props: TFormGroup) => (
    <div className="form-group">
        <label htmlFor={props.id} className="label-title">{props.labelText}</label>
        <FormFieldInput id={props.id} name={props.formName} placeholder={props.placeholder} />
    </div>
)
