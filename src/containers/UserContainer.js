import React, {Component} from 'react'
import Users from '../components/Users'
import ShowSingleUser from '../components/ShowSingleUser'



class UserContainer extends Component {

    state = {
        users: [],
        
    }

    componentDidMount(){
        fetch('http://localhost:3000/api/v1/users')
        .then(resp => resp.json())
        .then(users => this.setState({users}))
    }

    
    render(){
        // console.log(this.state)
        return (
            <div>
                <h1></h1>
                <Users users ={this.state.users} />
            </div>
        )
    }
}
export default UserContainer
