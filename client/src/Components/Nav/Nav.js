import React from "react";
import "./Nav.css";
import logo from "./../../novelize_logo2.png"

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark">
    <a className="navbar-brand" href="/">
      <img src={logo} id="logo"/>
    </a>
    <a className="nav-item ml-auto" href="/login">
      Login/Register
    </a>
  </nav>
);

export default Nav;
