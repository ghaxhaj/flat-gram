import React from 'react'

class SignupForm extends React.Component {

  state = {
    userName: "",
    password: "",
    passwordConfirmation: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.password === this.state.passwordConfirmation){
      fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({userName: this.state.userName, password: this.state.password})
      })
      .then(res => res.json())
      .then(response => {
        if(response.errors){
          alert(response.errors)
        } else {
          // send them somewhere
          // storing the user object SOMEWHERE
          this.props.setUser(response)
        }
      })
    } else {
      alert("Passwords don't match! check for case_sensitive Password should be atlease 3 characters")
    }

    this.setState({
      userName: "",
      password: "",
      passwordConfirmation: ""
    })

  }

  render(){
    return (
      <div className="center-form">
        
        <form className="formLogin" onSubmit={this.handleSubmit}>
          <h1 className='salut'> Hi {this.state.userName}</h1>
          <input className="formInput" name="userName" value={this.state.userName} onChange={this.handleChange}placeholder="username"/>
          <br></br>
          <br></br>
          <input className="formInput" name="password" value={this.state.password} type="password"  onChange={this.handleChange}placeholder="password"/>
          <br></br>
          <br></br>
          <input className="formInput" name="passwordConfirmation" value={this.state.passwordConfirmation} type="password"  onChange={this.handleChange}placeholder="password confirmation"/>
          <br></br>
          <br></br>
          <button className="formInput" type="submit">Sign Up</button>
        </form>
      </div>
    )
  }
  
}

export default SignupForm