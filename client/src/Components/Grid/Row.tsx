import React from "react";

type TRow = {
  fluid?: any,
  children: any,
  id?: any,
}

export const Row = ({ fluid, children, id }: TRow) => (
  <div className={`row${fluid ? "-fluid" : ""}`} id={id}>
    {children}
  </div>
);
