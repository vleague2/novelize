import React from "react";
import { Row, Col } from "../Grid";
import "./ItemCard.css";

type TItemCard = {
  isEditable?: boolean;
  onEditClick?: (id: number) => void;
  id?: number;
  itemType?: any;
  text?: any;
  image?: any;
  title?: any;
  preview?: any;
  active?: boolean;
};

const ItemCard = (props: TItemCard) => {
  function getLinkText() {
    if (props.isEditable) {
      return (
        <p
          className="edit-item text-right mb-0"
          onClick={() => props.onEditClick(props.id)}
        >
          Edit
        </p>
      );
    }

    return (
      <div>
        <p
          className="view-more text-right mb-0"
          data-toggle="collapse"
          data-target={`#collapse-${props.itemType}-${props.id}`}
        >
          View More
        </p>

        <p
          className="collapsible-text collapse"
          id={`collapse-${props.itemType}-${props.id}`}
          dangerouslySetInnerHTML={{ __html: props.text }}
        ></p>
      </div>
    );
  }

  return (
    <div className={`card rounded-0 ${props.active && 'active'}`} id={props.id.toString()}>
      <div className="card-body">
        <Row>
          {props.image && (
            <Col size={3}>
              <img src={props.image} className="item-image" alt={props.title} />
            </Col>
          )}

          <Col size={8} padding="pl-3">
            <p className="primary-text mb-1">{props.title}</p>
            {/* @TODO: text wrap? */}
            <p className="secondary-text mb-1">{props.preview}</p>
          </Col>
        </Row>
        <Row>
          <Col size={12}>{getLinkText()}</Col>
        </Row>
      </div>
    </div>
  );
};

export default ItemCard;
