import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './containers/Home'
import PostContainer from './containers/PostContainer';
import FollowersContainer from './containers/FollowersContainer'
import NavBar from './containers/NavBar'

function App() {
  return (
    <Router>
      <div>
        <NavBar />
    <Switch>
      <Route exact path="/">
          <Home />
      </Route>
      <Route path="/posts">
          <PostContainer />
      </Route>
      <Route path="/followers">
          <FollowersContainer />
      </Route>
    </Switch>
      </div>
    </Router>
  );
}

export default App;
