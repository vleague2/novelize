import React from "react";
import "./Grid.css";

type TContainer = {
  fluid?: any,
  children?: any,
}

export const Container = ({ fluid, children }: TContainer) => (
  <div id="container" className={`container${fluid ? "-fluid" : ""}`}>
    {children}
  </div>
);
