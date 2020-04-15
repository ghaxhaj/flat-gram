import React, {Component} from 'react'
import '../styles.css'
import { withRouter } from "react-router";
// import { useParams} from 'react-router-dom';

class ShowSingleUser extends Component{

    state = {
        targetUser: {id:'', name:'', userName: '',password:'', email: '', imageurl:'' }
    }
    componentDidMount(){
        let { id } = this.props.match.params;              
        fetch(`http://localhost:3000/api/v1/users/${id}`)
        .then(res => res.json())
        .then(targetUser => this.setState({
            targetUser 
        }))
    }

    render(){
        console.log('***props***', this.props)
        let { id } = this.props.match.params; 
        console.log('*** target id***', id)
        console.log('*** targetUser***', this.state.targetUser)
        return(
            <div>
                <h1>User More Details</h1>
                <img src={this.state.targetUser.imageUrl} alt={this.state.targetUser.name}/> 
                <br></br>
                Name: {this.state.targetUser.name}
                <br></br>
                userName: {this.state.targetUser.userName}
                <br></br>
                Email: {this.state.targetUser.email}
                
                
                
            </div>
        )
    } 
}     


    export default withRouter(ShowSingleUser);