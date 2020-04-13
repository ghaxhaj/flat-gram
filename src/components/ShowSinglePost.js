import React, {Component} from 'react'
import '../styles.css'
import { withRouter } from "react-router";
// import { useParams} from 'react-router-dom';

class ShowSinglePost extends Component{

    state = {
        targetPost: {}
    }
    componentDidMount(){
        let { id } = this.props.match.params;
                        
        fetch(`http://localhost:3000/api/v1/posts/${id}`)
        .then(res => res.json())
        .then(targetPost => this.setState({targetPost}))
    }

    mapComments = () => {
        return this.state.targetPost.comments.map(comment => <p>{comment.content}</p>)
    }
    render(){

        console.log('***props***', this.props)
        let { id } = this.props.match.params; 
        console.log('***id***', id)
        console.log('***targetPost***', this.state.targetPost.comments)


        return(
        
            <div>
                <h1>More Details</h1>
                <img src={this.state.targetPost.content} alt=''/> 
                <br></br>
                caption: {this.state.targetPost.user_caption}
                <br></br>
                <ul>
                commets: 
                <br></br> 
                {this.mapComments}
                </ul>
                
            </div>
        )
    } 
}     


    export default withRouter(ShowSinglePost);
    
