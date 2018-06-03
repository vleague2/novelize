import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer"
import Login from "./Pages/Login/Login";
import Editor from "./Pages/Editor/Editor";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path = "/editor" component={Editor} />
      </Switch>
       {/* ADD IN THE FOOTER */}
      <Footer/>
    </div>
  </Router>
);

export default App;
