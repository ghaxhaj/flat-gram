import React, {Component} from 'react'


class UserCard extends Component {

    
    render(){
        
        return (
            <div>
                <h1> {this.props.userName}</h1> 
            </div>
        )
    }
}
export default UserCard
