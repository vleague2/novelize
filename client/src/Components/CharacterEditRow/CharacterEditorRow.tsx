import React from "react";
import "./CharacterEditorRow.css";
import { Row, Col } from "../Grid";
import BackButton from "../BackButton";
import Button from "../Button";
import { FormFieldInput } from "../Form";

type TCharacterEditorRowProps = {
  previewTextValue: string;
  nameValue: string;
  imageValue: string;
  onPreviewTextChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onDelete: () => void;
};

const CharacterEditorRow = (props: TCharacterEditorRowProps) => {
  return (
    <div>
      <Row>
        <Col size={1}>
          <BackButton />
        </Col>

        <Col size={2}>
          <p className="text-right mt-3 form-text">One-line Bio</p>
        </Col>

        <Col size={6}>
          <FormFieldInput
            value={props.previewTextValue}
            name="preview_text"
            onChange={props.onPreviewTextChange}
          />
        </Col>

        <Col size={3}>
          {/* @TODO the placement and sizing of this button is misleading, since it saves the whole page */}
          <Button className="btn-success save-btn" onClick={props.onSave}>
            Save
          </Button> 
          {/* @TODO some sort of confirmation prompt would be nice lol */}
          <Button className="btn-danger delete-btn" onClick={props.onDelete}>
            Delete
          </Button>
        </Col>
      </Row>

      <Row>
        <Col size={3}>
          <p className="mt-3 form-text text-right">Name</p>
        </Col>

        {/* @TODO client-side validation for required field */}
        <Col size={3}>
          <FormFieldInput
            value={props.nameValue}
            name="name"
            onChange={props.onNameChange}
          />
        </Col>

        <Col size={1}>
          <p className="mt-3 form-text text-right">Image</p>
        </Col>

        <Col size={3}>
          <FormFieldInput
            value={props.imageValue}
            name="character_image"
            onChange={props.onImageChange}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CharacterEditorRow;
