import React from 'react'

class LoginForm extends React.Component {

  state = {
    userName: "",
    password: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(response => {
      //set user to state
      //redirect!
      if (response.errors){
        alert(response.errors)
      } else {
        this.props.setUser(response)
      }
    })

    this.setState({
        userName: "",
        password: ""
      })

  }

  render(){
    return (
      <div className="center-form">
        <form className="formLogin" onSubmit={this.handleSubmit}>
          <h1 className='salut'> Hi {this.state.userName}</h1>

          <input className='formInput' name="userName" value={this.state.userName} onChange={this.handleChange}placeholder="userName"/>
          <br></br>
          <br></br>
          <input className='formInput' name="password" value={this.state.password} type="password"  onChange={this.handleChange}placeholder="password"/>
          <br></br>
          <br></br>
          <button className="formInput" type="submit">Log In</button>
        </form>
      </div>
    )
  }
  
}

export default LoginForm