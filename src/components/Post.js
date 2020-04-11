import React from 'react'
import Comment from './CommentForm'
import '../styles.css'

class Post extends React.Component{

    state = {
        likes: 0,
        liked: false,
        addComment: '',
        comments: []
    }

    componentDidMount(){
        fetch('http://localhost:3000/api/v1/comments')
        .then(resp => resp.json())
        .then(data => this.setState({
            comments: data
        }))
    }

    handleLike = () => {
        if(this.state.liked === false){
        this.setState({
            liked: !this.state.liked,
            likes: this.state.likes + 1
        })}else{
            this.setState({
                liked: !this.state.liked,
                likes: this.state.likes - 1
        })
    }}
    
    handleOnChange = (event) => {
        
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCommentSubmit  = (event) => {
        event.preventDefault()

        let data = {
            user_id: 1,
            post_id: this.props.id,
            content: this.state.addComment
        }


        
        fetch('http://localhost:3000/api/v1/comments', {
            method: 'POST',
            headers: {"Content-Type": "application/json",
            "Accept": "application/json"},    
            body: JSON.stringify(data)
        })

        .then(resp=>resp.json())
        .then(comment => this.setState({
            comments: [...this.state.comments, comment],
            addComment: ''}))
    }
    
    handleDelete = (id) => {
        fetch(`http://localhost:3000/api/v1/comments/${id}`, {
            method: "DELETE"
        }).then(this.componentDidMount())
    }

    mapComments = () => {
    return this.state.comments.map(comment => <p key={comment.id}>{comment.content}<button onClick={() => this.handleDelete(comment.id)}>Delete</button></p>)
    }

    render(){

    return(
        <div className = "postStyle">
            <img className = "postImg" src={this.props.content} />
            <p>User Caption: {this.props.user_caption}</p>
            <p>{this.state.likes} Likes </p>

            {this.state.comments.length > 0 ? this.mapComments() : null}

            <button className = "likeButton"onClick={this.handleLike}>Like</button>

            <Comment comment = {this.state.addComment}
            handleChange = {this.handleOnChange}
            handleSubmit = {this.handleCommentSubmit}/>

        </div>
    )
}}

export default Post

