import React from "react";
import "./CardBody.css";

const CardBody = ({id, children, href}) => (
    <div className="card rounded-0">
        <a href={href}>
            <div className="card-body text-center" id={id}>
                {children}
            </div>
        </a>
    </div>
)

export default CardBody;