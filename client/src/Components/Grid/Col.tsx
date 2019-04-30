import React from "react";

type TCol = {
  size: number,
  children: any,
  id?: string,
  padding?: string,
  margin?: string,
  align?: string,
}

export const Col = ({ size, children, id, padding, margin, align }: TCol) => (
    <div 
      className={`
        col-sm-${size}
        ${padding ? " " + padding : ""}
        ${margin ? " " + margin : ""}
        ${align ? " " + align : ""}
      `} 
      id={id}
    >
      {children}
    </div>
);
