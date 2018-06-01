import React from "react";

export const Col = ({ size, children, id, align }) => (
  <div className={size.split(" ").map(size => "col-" + size).join(" ")} id={id}>
    {children}
  </div>
);
