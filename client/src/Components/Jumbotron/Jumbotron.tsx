import React from "react";
import "./Jumbotron.css";

type TJumbotron = {
  children?: any,
}

const Jumbotron = ({ children }: TJumbotron) => (
  <div className="jumbotron jumbotron-fluid">
    {children}
  </div>
);

export default Jumbotron;
