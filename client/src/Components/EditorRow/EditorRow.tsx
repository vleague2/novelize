import React from "react";
import "./EditorRow.css";
import { Row, Col } from "../Grid";
import BackButton from "../BackButton";
import Button from "../Button";
import { FormFieldInput } from "../Form";

// maybe pass in a type: character, note, world
// and have a switch on that

type TEditorRowProps = {
  mainFormLabel: string;
  formName: string;
  formValue: string;
  onChange: (e: any) => void;
  onDelete: () => void;
  shouldShowBottomRow: boolean;
  leftLabel?: string;
  leftFormValue?: string;
  leftFormName?: string;
  rightLabel?: string;
  rightFormValue?: string;
  rightFormName?: string;
};

const EditorRow = (props: TEditorRowProps) => {
  // @TODO this is awful. set default instead
  const shouldShowBottomRow = props.shouldShowBottomRow || false;

  return (
    <div>
      <Row>
        <Col size={1}>
          <BackButton />
        </Col>

        <Col size={2}>
          <p className="text-right mt-3 form-text">{props.mainFormLabel}</p>
        </Col>

        <Col size={6}>
          <FormFieldInput
            value={props.formValue}
            name={props.formName}
            onChange={props.onChange}
          />
        </Col>

        <Col size={3}>
          <Button className="btn-danger delete-btn" onClick={props.onDelete}>
            Delete
          </Button>
        </Col>
      </Row>

      {shouldShowBottomRow && (
        <Row>
          <Col size={3}>
            <p className="mt-3 form-text text-right">{props.leftLabel}</p>
          </Col>

          <Col size={3}>
            <FormFieldInput
              value={props.leftFormValue}
              name={props.leftFormName}
              onChange={props.onChange}
            />
          </Col>

          <Col size={1}>
            <p className="mt-3 form-text text-right">{props.rightLabel}</p>
          </Col>

          <Col size={3}>
            <FormFieldInput
              value={props.rightFormValue}
              name={props.rightFormName}
              onChange={props.onChange}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default EditorRow;
