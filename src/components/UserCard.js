import React, {Component} from 'react'

import '../styles.css'
import { BrowserRouter as Router,
    Link,Route,Switch,
  } from 'react-router-dom';


class UserCard extends Component {

    
    render(){
        
        return (
            
                <div className='userCardDiv'>
                    <Link to={`/users/${this.props.id}`}>
                        <img className = "postImg" src={this.props.imageUrl} alt={this.props.name}/>
                    </Link>
                    <h1 > Name: {this.props.name}</h1>    
                    <h1 > userName: {this.props.userName}</h1> 
                    <h1 > Email: {this.props.email}</h1>

                </div>
           
        )
    }
}
export default UserCard
