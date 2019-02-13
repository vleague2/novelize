import React from "react";
import { Row, Col } from "../Grid";
import BackButton from "../BackButton";
import Button from "../Button";
import { FormFieldInput } from "../Form";

// possible props
// handleInputChange for each form field
// Title for world and note
// Name for character
// image for character
// one-line bio for character
// onDelete for delete button

// maybe pass in a type: character, note, world
// and have a switch on that


// type TEditorRowProps {
//     mainFormLabel: string;
//     placeholder: string;
//     formName: string;
//     onChange: function;
//     onDelete: function;
//     shouldShowBottomRow: boolean;
//     leftLabel?: string;
//      left placeholder?: stringl
//      left formName?: string;
//      rightLabel?: string;
//      right placeholder?: string;
//      right formName?: string;
// }

const EditorRow = ( props ) => {
    // @TODO this is awful
    const shouldShowBottomRow = props.shouldShowBottomRow || false;

    return (
        <div>
            <Row>
                <Col size="1">
                    <BackButton/>
                </Col>

                <Col size="2">
                    <p className="text-right mt-3 form-text">{props.mainFormLabel}</p>
                </Col>

                <Col size="6">
                    <FormFieldInput
                        id="ugh" 
                        value={props.placeholder} 
                        name={props.formName} 
                        onChange={props.onChange}
                    />
                </Col>

                <Col size="3">
                    <Button 
                        className="btn-danger delete-btn" 
                        onClick={props.onDelete}
                    >
                        Delete 
                    </Button>
                </Col>
            </Row>
             
            { shouldShowBottomRow && 
                <Row>
                    <Col size="3">
                        <p className="mt-3 form-text text-right">{props.leftLabel}</p>
                    </Col>

                    <Col size="3">
                        <FormFieldInput 
                            id="name-input" 
                            value={props.leftPlaceholder} 
                            name={props.leftFormName}
                            onChange={props.onChange}
                        />
                    </Col>

                    <Col size="1">
                        <p className="mt-3 form-text text-right">{props.rightLabel}</p>
                    </Col>

                    <Col size="3">
                        <FormFieldInput 
                            id="image-input" 
                            value={props.rightPlaceholder} 
                            name={props.rightFormName} 
                            onChange={props.onChange}
                        />
                    </Col>
                </Row>  
            }
        </div>
    )
};

export default EditorRow;