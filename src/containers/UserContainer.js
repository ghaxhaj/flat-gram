import React, {Component} from 'react'
import Users from '../components/Users'
import ShowSingleUser from '../components/ShowSingleUser'
import { withRouter } from "react-router";
 


class UserContainer extends Component {

    state = {
        users: [],
        
    }

    componentDidMount(){
        fetch('http://localhost:3000/api/v1/users')
        .then(resp => resp.json())
        .then(users => this.setState({users}))
    }
    deleteProfil = (UserTODelelte) => {
        console.log('user to delete ****' , UserTODelelte)
        let newUsers = this.state.users.filter(user => user.id !== UserTODelelte.id)
        this.setState({users: newUsers})
    }
    
    handleUpdateProfil = (updatedProfil) => {
        let newUsers = this.state.users.map(user => {
            if (user.id===updatedProfil.id){
                return updatedProfil
            }else {
                return user
            }
        })
        this.setState({users: newUsers})
    }
    render(){
      
        return (
            <div>
                <h1></h1>
                <Users users ={this.state.users} 
                handleUpdateProfil={this.handleUpdateProfil}  
                deleteProfil={this.deleteProfil} />
            </div>
        )
    }
}
export default UserContainer
