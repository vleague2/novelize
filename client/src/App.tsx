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
import NoMatch from "./Pages/404/404";
import API from './utils/API';

export const StoryContext = React.createContext({
  storyId: "0",
  setStoryId: (id: string) => {},
});

const App = () => {
  const storedStoryId = localStorage.getItem("currentStoryId");

  const [storyId, setStoryId] = React.useState<string>(storedStoryId);

  React.useEffect(() => {
    if (!storyId) {
      API.getAllStories()
      .then((res) => {
        setStoryId(res.data[0].id);
      })
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem("currentStoryId", storyId);
  }, [storyId])

  return (
    <Router>
      <StoryContext.Provider value={{ storyId, setStoryId }}>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path= "/editor" component={Editor} />
          <Route exact path= "/character-edit" component={Character}/>
          <Route exact path= "/world-edit" component={World}/>
          <Route exact path= "/notes-edit" component={Note}/>
          <Route exact path= "/plot-edit" component={Plot}/>
          <Route component={NoMatch}/>
        </Switch>
        {/* <Footer/> */}
      </StoryContext.Provider>
    </Router>
  )
};

export default App;
