import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {Home, Users, Posts, SignupForm, NavBar, SearchBar, 
        LoginForm, ShowSinglePost, ShowSingleUser} from './components'
import UserContainer from './containers/UserContainer'
import PostContainer from './containers/PostContainer'
import MainContainer from './containers/MainContainer'


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
      
        <NavBar currentUser={this.state.currentUser} logout={this.logout}/>
        
        {this.state.currentUser ? 
        <Switch>
          {/* <Route exact path="/"> <Home /> </Route>
          <Route path="/login" render={() => <LoginForm setUser={this.setUser}/>}/>
          <Route path="/signup" render={() => <SignupForm setUser={this.setUser}/>}/> */}

          <Route path="/posts/:id"> <ShowSinglePost /> </Route>
          <Route path="/posts"> <PostContainer /> </Route>

          <Route  path="/users/:id"> <ShowSingleUser  /> </Route>
          <Route exact path="/users"> <UserContainer currentUser={this.state.currentUser}/> </Route>

        </Switch>
        : 
        <div>

          <h1> 🤙🤙🤙 Please Login or SignUp 🤙🤙🤙  </h1>

          <Switch>
          
            {/* <Route exact path="/"> <Home /> </Route> */}
            <Route path="/login" render={() => <LoginForm setUser={this.setUser}/>}/>
            <Route path="/signup" render={() => <SignupForm setUser={this.setUser}/>}/>

            {/* <Route path="/posts/:id"> <ShowSinglePost /> </Route>
            <Route path="/posts"> <PostContainer /> </Route>

            <Route  path="/users/:id"> <ShowSingleUser /> </Route>
            <Route exact path="/users"> <UserContainer /> </Route> */}

          </Switch>
        </div>
         
        }
     
    </Router>
  );
  }
}

export default App;
