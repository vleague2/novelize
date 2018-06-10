import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer"
import Login from "./Pages/Login/Login";
import Editor from "./Pages/Editor/Editor";
import Character from "./Pages/Characters/Characters";
import World from "./Pages/Worlds/Worlds";
import Note from "./Pages/Notes/Notes";
import Plot from "./Pages/Plot/Plot";
import Dashboard from "./Pages/Dashboard/Dashboard";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path ="/dashboard" component={Dashboard} />
        <Route exact path = "/editor" component={Editor} />
        <Route exact path = "/character-edit" component={Character}/>
        <Route exact path = "/world-edit" component={World}/>
        <Route exact path = "/notes-edit" component={Note}/>
        <Route exact path = "/plot-edit" component={Plot}/>
      </Switch>
       {/* ADD IN THE FOOTER */}
      <Footer/>
    </div>
  </Router>
);

export default App;
