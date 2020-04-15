import React, {Component} from 'react'
import '../styles.css'
import { withRouter } from "react-router";
// import { useParams} from 'react-router-dom';

class ShowSingleUser extends Component{

    state = {
        targetUser: {comments:[]}
    }
    componentDidMount(){
        let { id } = this.props.match.params;              
        fetch(`http://localhost:3000/api/v1/posts/${id}`)
        .then(res => res.json())
        .then(targetUser => this.setState({targetUser}))
    }

    
    render(){

        

        return(
        
            <div>
                More Details about User
                
                
                
            </div>
        )
    } 
}     


    export default withRouter(ShowSingleUser);