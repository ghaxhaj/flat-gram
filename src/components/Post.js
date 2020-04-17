import React from 'react'
import Comment from './CommentForm'
import '../styles.css'

class Post extends React.Component{

    state = {
        likes: 0,
        liked: false,
        addComment: '',
        comments: [],
        editPost: false,
        newContent:'',
        userCaption:''
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

    handleEditPostSubmit = (event) => {
        event.preventDefault()
        fetch(`http://localhost:3000/api/v1/posts/${this.props.id}`, {
            method: 'PATCH',
            headers: {"Content-Type": "application/json",
                      "Accept": "application/json"},    
            body: JSON.stringify({
                content: this.state.newContent, 
                user_caption: this.state.userCaption
            })
        })
        .then(resp=>resp.json())
        .then(data =>  {console.log(data) 
            this.props.updatePost(this.props.id, this.state.newComment,this.state.userCaption)
        })
        this.setState({ newContent: "" , userCaption: '', editPost: false })  
    } 

    changeEditPostState = () => {
        this.setState({editPost: !this.state.editPost})
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

 
    

    render(){
        
    return(
        <div className = "postStyle">
            <img className = "postImg" src={this.props.content} />
            <p>User Caption: {this.props.user_caption}</p>
            <p>{this.state.likes} Likes </p>

            {this.state.comments.length > 0 ? this.mapComments() : null}

            <button className = "likeButton"onClick={this.handleLike}>Like</button>
            <button className = "button" onClick = {this.changeEditPostState}>Edit Post</button>
            {this.state.editPost ? 
                <form onSubmit={this.handleEditPostSubmit}>
                    <label>content:</label>
                        <input type="text"
                            name="newContent"
                            value={this.state.newContent}
                            onChange={this.handleChange}/>
                    <label> User Caption:</label>
                        <input type="text"
                            name="userCaption"
                            value={this.state.userCaption}
                            onChange={this.handleChange}/>
                    <input type='Submit' value="Submit" />
                </form>
            : 
            null}
            <button className = "button" onClick = {this.handlePostDelete}>Delete Post</button>
            <h3></h3>
            <Comment comment = {this.state.addComment}
            handleChange = {this.handleOnChange}
            handleSubmit = {this.handleCommentSubmit}/>

        </div>
    )
}}

export default Post

