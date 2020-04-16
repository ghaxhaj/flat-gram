import React, {Component} from 'react'

import '../styles.css'
import { BrowserRouter as Router,
    Link,Route,Switch,
  } from 'react-router-dom';


class Profil extends Component {
    state = {
        userProfil: {},
        edit: false, name: '', 
        userName: '', email: '', 
        password: '', imageUrl: ''
    

    }
    componentDidMount(){
        if (this.props.currentUser){
        let id = this.props.currentUser.id
        fetch(`http://localhost:3000/api/v1/users/${id}`)
        .then(resp => resp.json())
        .then(userProfil => this.setState({userProfil}))

        }
    }
    
    toggleEdite = () => {
        this.setState({
            edit: !this.state.edit
        })
    }
    handleOnChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()   
        let id = this.props.currentUser.id
        fetch(`http://localhost:3000/api/v1/users/${id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json",
                      "Accept": "application/json"},    
            body: JSON.stringify({user: {
                name: this.state.name, 
                userName: this.state.userName, 
                email: this.state.email, 
                password: this.state.password, 
                imageUrl: this.state.imageUrl
            }})
        })
        .then(resp=>resp.json())
        .then(userProfil => this.setState({userProfil}) )

        this.setState({ 
            edit: false, name: '', 
            userName: '', email: '', 
            password: '', imageUrl: ''
        })  
        
    }

    handleUserDelete = () => {
        let id = this.props.currentUser.id
        fetch(`http://localhost:3000/api/v1/users/${id}`, 
               {method: "DELETE"}
        )
        .then(resp => resp.json())
        .then(data => console.log(data))

        this.setState({ 
            edit: false, name: '', 
            userName: '', email: '', 
            password: '', imageUrl: ''
        })
    }



    
    render(){  
        console.log('searching currentUser.id****', this.props.currentUser)      
        return (
            
                <div className='userCardDiv'>
                   
                    <img className = "postImg" src={this.state.userProfil.imageUrl} alt={this.state.userProfil.name}/>
                    
                    <h1 > Name: {this.state.userProfil.name}</h1>    
                    <h1 > userName: {this.state.userProfil.userName}</h1> 
                    <h1 > Email: {this.state.userProfil.email}</h1>
                    <br></br>
 
                    <button className = "button" onClick={this.toggleEdite}> Edit Profile </button>
                   
                    {this.state.edit? 
                        <form className='userCardDiv' onSubmit={this.handleSubmit} >
                            <label>Name:</label>
                                <input type="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleOnChange}/>
                            <label> User Name:</label>
                                <input type="text"
                                    name="userName"
                                    value={this.state.userName}
                                    onChange={this.handleOnChange}/>
                            <label> password:</label>
                                <input type="text"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleOnChange}/>
                            <label> Email:</label>
                                <input type="text"
                                    name="email"
                                    value={this.state.email}
                                    onChange={this.handleOnChange}/> 
                            <label> Image URL:</label>
                                <input type="text"
                                    name="imageUrl"
                                    value={this.state.imageUrl}
                                    onChange={this.handleOnChange}/>
                                    <br></br>
                                    <br></br>
                            <input type='Submit' value="Submit" />
                        </form>
                    :
                        null
                    }
                    
                    <button className = "button"onClick={this.handleUserDelete}> Delete Profile </button> 
                    
  
                        

                </div>
           
        )
    }
}
export default Profil
