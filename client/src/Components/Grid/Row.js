import React from "react";

export const Row = ({ fluid, children, id }) => (
  <div className={`row${fluid ? "-fluid" : ""}`} id={id}>
    {children}
  </div>
);
