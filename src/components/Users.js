import React, {Component} from 'react'

import UserCard from './UserCard'



class Users extends Component {

  
renderUsers = () => {
    return this.props.users.map(user => <UserCard className='userCardDiv' key={user.id} 
     {...user} handleUpdateProfil={this.props.handleUpdateProfil} 
     deleteProfil={this.props.deleteProfil}
     />)}



    render(){

        return (
            <div >
                {this.renderUsers()}
            </div>
        )
    }
}
export default Users
