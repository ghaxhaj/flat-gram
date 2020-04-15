import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './containers/Home'
import NavBar from './containers/NavBar'
import User from './containers/UserContainer'
import Post from './components/Post'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import ShowSinglePost from './components/ShowSinglePost';

class  App extends Component {
  state = { 
    currentUser: null 
  }

  componentDidMount(){
    const token = localStorage.token
    
    if(token){
      //get user info
      console.log(token)

      fetch("http://localhost:3000/api/v1/auto_login", {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then(response => {
        console.log(response)
        if (response.errors){
          alert(response.errors)
        } else {
          this.setState({
            currentUser: response
          })
        }})}}


  setUser = (response) => {
    this.setState({
      currentUser: response.user
    }, () => {
      localStorage.token = response.token
      this.props.history.push("/posts")
    })
    
  } 

  logout = () => {
    this.setState({ 
      currentUser: null
    }, () => { localStorage.removeItem('token')
               this.props.history.push('/login')
  })
  }



  render() {
  return (
    <Router>
      <div>
        <NavBar currentUser={this.state.currentUser} logout={this.logout}/>
    <Switch>
      <Route path="/login" render={() => <LoginForm setUser={this.setUser}/>}/>
      <Route path="/signup" render={() => <SignupForm setUser={this.setUser}/>}/>

      <Route path="/posts/:id"> <ShowSinglePost /> </Route>
      <Route path="/posts"> <User /> </Route>
      <Route exact path="/"> <Home /> </Route>
    </Switch>
      </div>
    </Router>
  );
  }
}

export default App;
