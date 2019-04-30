import React from "react";

type TButton = {
    className?: string,
    onClick?: any,
    id?: any,
    dataDismiss?: any,
    ariaLabel?: any,
    children?: any,
}

const Button = (props: TButton) => (
    <button type="button" className={`btn ${props.className}`} onClick={props.onClick} id={props.id} data-dismiss={props.dataDismiss} aria-label={props.ariaLabel}>
        {props.children}
    </button>
);

export default Button;