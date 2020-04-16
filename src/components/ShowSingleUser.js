import React, {Component} from 'react'
import '../styles.css'
import { withRouter } from "react-router";
// import { useParams} from 'react-router-dom';

class ShowSingleUser extends Component{

    state = {
        
        targetUser: { }
    }
    componentDidMount(){
        let { id } = this.props.match.params;              
        fetch(`http://localhost:3000/api/v1/users/${id}`)
        .then(res => res.json())
        .then(targetUser => this.setState({
            targetUser 
        }))
    }

    

    handleSubmit = (event) => {
        event.preventDefault()   
        let { id } = this.props.match.params; 
        console.log('****** id updat  **', id)  
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
        .then(data =>  {console.log('***update data **', data) 
            this.props.handleUpdateProfil(data)
        })

        this.setState({ 
            edit: false, name: '', 
            userName: '', email: '', 
            password: '', imageUrl: ''
        })  
        
    }

    render(){
        // console.log('*** this props ***', this.props)
        // console.log('***props handleUpdateProfil***', this.props.handleUpdateProfil)
        // let { id } = this.props.match.params; 
        // console.log('*** target id***', id)
        // console.log('*** targetUser***', this.state.targetUser)
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
                    <br></br>
            </div>
        )
    } 
}     


    export default withRouter(ShowSingleUser);