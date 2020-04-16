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
      console.log("i hit before the fetch")
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
          console.log("I hit after the fetch")
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
        <form className="auth-form" onSubmit={this.handleSubmit}>
          <input name="userName" value={this.state.userName} onChange={this.handleChange}placeholder="username"/>
          <input name="password" value={this.state.password} type="password"  onChange={this.handleChange}placeholder="password"/>
          <input name="passwordConfirmation" value={this.state.passwordConfirmation} type="password"  onChange={this.handleChange}placeholder="password confirmation"/>
          <button className="login" type="submit">Sign Up</button>
        </form>
      </div>
    )
  }
}
export default SignupForm