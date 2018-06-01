import React from "react";
import "./Grid.css";

export const Container = ({ fluid, children }) => (
  <div id="container" className={`container${fluid ? "-fluid" : ""}`}>
    {children}
  </div>
);
