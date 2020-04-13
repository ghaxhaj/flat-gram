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
        .then(data => this.fetchComments(data))
    }

    fetchComments = (data) => {
        let postComments = data.filter(comment => comment.post_id === this.props.id)
        this.setState({
            comments: postComments
        })
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

        // console.log(data)
        
        fetch('http://localhost:3000/api/v1/comments', {
            method: 'POST',
            headers: {"Content-Type": "application/json",
            "Accept": "application/json"},    
            body: JSON.stringify(data)
        })

        .then(resp=>resp.json())
        .then(comment => this.setState({
            comments: [...this.state.comments, comment],
            addComment: ''}),)
    }
    
    handleDelete = (id) => {
        fetch(`http://localhost:3000/api/v1/comments/${id}`, {
            method: "DELETE"
        }).then(this.updateComments(id))
    }

    updateComments = (commentId) => {
        let updatedComments = this.state.comments.filter(comment => comment.id !== commentId)
        this.setState({comments: updatedComments})
    }

    mapComments = () => {
    return this.state.comments.map(comment => <p key={comment.id}>{comment.content}<button onClick={() => this.handleDelete(comment.id)}>Delete</button></p>)
    }

    handlePostDelete = () => {
        fetch(`http://localhost:3000/api/v1/posts/${this.props.id}`, {
            method: "DELETE"
        }).then(resp => resp.json())
        .then(data => this.props.renderPosts(this.props.id))
    }
    

    render(){
        
    return(
        <div className = "postStyle">
            <img className = "postImg" src={this.props.content} />
            <p>User Caption: {this.props.user_caption}</p>
            <p>{this.state.likes} Likes </p>

            {this.state.comments.length > 0 ? this.mapComments() : null}

            <button className = "likeButton"onClick={this.handleLike}>Like</button>
            <button className = "button" onClick = {this.handlePostDelete}>Delete Post</button>

            <Comment comment = {this.state.addComment}
            handleChange = {this.handleOnChange}
            handleSubmit = {this.handleCommentSubmit}/>

        </div>
    )
}}

export default Post

