import React, {Component} from 'react'

import UserCard from './UserCard'



class Users extends Component {

  
renderUsers = () => {
    return this.props.users.map(user => <UserCard key={user.id} 
     {...user} 
     />)}



    render(){

        return (
            <div>
                {this.renderUsers()}
            </div>
        )
    }
}
export default Users
