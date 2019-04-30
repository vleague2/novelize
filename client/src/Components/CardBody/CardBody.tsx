import React from "react";
import "./CardBody.css";

type TCardBody = {
    id?: any,
    children?: any,
    onClick?: any,
}

const CardBody = ({ id, children, onClick }: TCardBody) => (
    <div className="card rounded-0">
        <a onClick={onClick} className="card-link">
            <div className="card-body text-center" id={id}>
                {children}
            </div>
        </a>
    </div>
)

export default CardBody;