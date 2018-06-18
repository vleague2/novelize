import React from "react";

// p and m are padding and margin
export const Col = ({ size, children, id, p, m, align }) => (
    <div className=
    {`col-sm-${size}${p ? " " + p : ""}${m ? " " + m : ""}${align ? " " + align : ""}`} 
    id={id}
    >
      {children}
    </div>
);
