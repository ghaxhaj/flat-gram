import React, {Component} from 'react'

import UserCard from './UserCard'
import SearchBar from './SearchBar'



class Users extends Component {
    state = {
        searchTerm: ''
    }
    handleSearchChange = (event) => {
        this.setState({searchTerm: event.target.value
        })
    }

    renderUsers = () => {
        return this.props.users
        .filter(user => user.userName.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        .map(user => <UserCard className='userCardDiv' key={user.id} 
        {...user} handleUpdateProfil={this.props.handleUpdateProfil} 
        deleteProfil={this.props.deleteProfil} 
        currentUser={this.props.currentUser}
        />)}
    render(){
        return (
            <div >
            <SearchBar searchTerm={this.state.searchTerm} 
                handleSearchChange={this.handleSearchChange}
            />
                {this.renderUsers()}  
            </div>
        )
    }
}
export default Users
