import React, {Component} from 'react'

import '../styles.css'
import { BrowserRouter as Router,
    Link,Route,Switch,
  } from 'react-router-dom';


class UserCard extends Component {
    state = {
        edit: false,
        name: '',
        userName: '',
        password: '',
        email: '',
        imageUrl: '',

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
        // let { id } = this.props.match.params; 
        // console.log('****** id updat  **', id)  
        fetch(`http://localhost:3000/api/v1/users/${this.props.id}`, {
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
        .then(data =>  {console.log('***update data **', data) 
            this.props.handleUpdateProfil(data)
        })

        this.setState({ 
            edit: false, name: '', 
            userName: '', email: '', 
            password: '', imageUrl: ''
        })  
        
    }

    handleUserDelete = () => {
        console.log('delete user prop id ***', this.props.id)
        fetch(`http://localhost:3000/api/v1/users/${this.props.id}`, 
               {method: "DELETE"}
        )
        .then(resp => resp.json())
        .then(data => this.props.deleteProfil(data))
    }



    
    render(){
        console.log('delete user prop id ***', this.props.id)
        
        return (
            
                <div className='userCardDiv'>
                    <Link to={`/users/${this.props.id}`}>
                        <img className = "postImg" src={this.props.imageUrl} alt={this.props.name}/>
                    </Link>
                    <h1 > Name: {this.props.name}</h1>    
                    <h1 > userName: {this.props.userName}</h1> 
                    <h1 > Email: {this.props.email}</h1>


                    <br></br>
                    <button onClick={this.toggleEdite}> Edit Profil </button>
                    {this.state.edit? 
                        <form onSubmit={this.handleSubmit} >
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
                            <input type='Submit' value="Submit" />
                        </form>
                    :
                        null
                    }
                    <button onClick={this.handleUserDelete}> Delete Profil </button> 
                    
                         
                        

                </div>
           
        )
    }
}
export default UserCard
