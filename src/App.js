import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './containers/Home'
import NavBar from './containers/NavBar'
import User from './containers/UserContainer'
import Post from './components/Post'
import ShowSinglePost from './components/ShowSinglePost';

function App() {
  return (
    <Router>
      <div>
        <NavBar />
    <Switch>
      <Route path="/posts/:id"> <ShowSinglePost /> </Route>
      <Route path="/posts"> <User /> </Route>
      <Route exact path="/"> <Home /> </Route>
    </Switch>
      </div>
    </Router>
  );
}

export default App;
