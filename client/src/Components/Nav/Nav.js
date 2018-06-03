import React from "react";
import "./Nav.css";

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark">
    <a className="navbar-brand" href="/">
      Novelize
    </a>
    <a className="nav-item ml-auto" href="/login">
      Login/Register
    </a>
  </nav>
);

export default Nav;
