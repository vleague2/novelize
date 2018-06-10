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
        sessionStorage.removeItem("user");
        window.location.href="/";
      })
    }
    else {
      window.location.href = "/login";
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <a className="navbar-brand" href={sessionStorage.getItem("user") == "true" ? "/dashboard" : "/"}>
        <img src={logo} id="logo"/>
      </a>
      <p className="nav-item ml-auto mt-3" onClick={logout} id={sessionStorage.getItem("user") == "true" ? "logout" : "login"}>
        {sessionStorage.getItem("user") == "true" ? "Logout" : "Login/Register"}
      </p>
    </nav>
  )
};

export default Nav;