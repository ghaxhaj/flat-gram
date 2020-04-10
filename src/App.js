import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './containers/Home'
import NavBar from './containers/NavBar'
import User from './containers/UserContainer'

function App() {
  return (
    <Router>
      <div>
        <NavBar />
    <Switch>
      <Route exact path="/">
          <Home />
      </Route>
      <Route path="/user">
          <User />
      </Route>
    
    </Switch>
      </div>
    </Router>
  );
}

export default App;
