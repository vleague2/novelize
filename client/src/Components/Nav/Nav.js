import React from "react";
import "./Nav.css";
import logo from "./../../novelize_logo2.png"
import axios from "axios";

const Nav = () => {

  const logout = (e) => {
    console.log(e.target.id);
    if (e.target.id == "logout") {
      axios.get("/auth/logout")
      .then(res => {
        console.log(res);
        sessionStorage.removeItem("userId");
        window.location.href="/";
      })
    }
    else {
      window.location.href = "/login";
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <a className="navbar-brand" href={sessionStorage.getItem("userId") == null ? "/" : "/dashboard"}>
        <img src={logo} id="logo"/>
      </a>
      <a className="nav-item ml-auto" onClick={logout} id={sessionStorage.getItem("userId") == null ? "login" : "logout"}>
        {sessionStorage.getItem("userId") == null ? "Login/Register" : "Logout"}
      </a>
    </nav>
  )
};

export default Nav;