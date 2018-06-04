import React from "react";
import "./CardBody.css";

const CardBody = ({id, children, onClick}) => (
    <div className="card rounded-0">
        <a onClick={onClick} className="cardLink">
            <div className="card-body text-center" id={id}>
                {children}
            </div>
        </a>
    </div>
)

export default CardBody;