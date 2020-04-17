import React, {Component} from 'react'
import CommentForm from './CommentForm'
import Like from './Like'
import '../styles.css'
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
  } from 'react-router-dom';


class PostCard extends Component{

    state = {
        likes: 0,
        liked: false,
        addComment: '',
        comments: [],
        currentLikeId: null,
        currentLike: '',
        allLikes: [],
       

        editPost: false,
        newContent:'',
        userCaption:'',

        addNewComment: false

    }

    componentDidMount(){
        fetch('http://localhost:3000/api/v1/comments')
        .then(resp => resp.json())
        .then(data => this.fetchComments(data))
        fetch("http://localhost:3000/api/v1/likes")
        .then(resp => resp.json())
        .then(likes => this.fetchLikes(likes))

    }
    



    fetchComments = (data) => {
        let postComments = data.filter(comment => comment.post_id === this.props.id)
        this.setState({
            comments: postComments
        })
    }

    fetchLikes = (likes) => {
        let postLikes = likes.filter(like => like.post_id === this.props.id)
        let likeCount = postLikes.length
        this.setState({
            allLikes: postLikes, 
            likes: likeCount})
    }

    

    handleLike = () => {


        if(this.state.currentLike === ''){

        let data = {
            user_id: this.props.currentUser.id,
            post_id: this.props.id,
            count: 1
        }

        // console.log(data)

        fetch("http://localhost:3000/api/v1/likes", {
            method: "POST",
            headers: {"Content-Type": "application/json",
            "Accept": "application/json"},    
            body: JSON.stringify(data)})
            .then(resp => resp.json())
            .then(like => this.setState({
                currentLike: like,
                currentLikeId: like.id,
                liked: !this.state.liked,
                likes: this.state.likes + 1}),
                this.componentDidMount())
            
            
        //     this.setState({
            
        //     liked: !this.state.liked,
        //     likes: this.state.likes + 1
        // })
   
        console.log("done")
    }else{
            fetch(`http://localhost:3000/api/v1/likes/${this.state.currentLikeId}`, {
            method: "DELETE"})
            .then(this.setState({
                currentLike: '',
                currentLikeId: '',
                liked: !this.state.liked,
                likes: this.state.likes - 1}))
        //     this.setState({
        //         liked: !this.state.liked,
        //         likes: this.state.likes - 1
        // })
       
        console.log("undone")
    }}
    
    handleOnChange = (event) => {
        
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCommentSubmit  = (event) => {
        event.preventDefault()

        let data = {
            user_id: this.props.currentUser.id,
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
    return this.state.comments.map(comment => 
    <div>
        <p key={comment.id}>{comment.content}</p>
        {comment.user_id === this.props.currentUser.id ? <button className='booton' onClick={() => this.handleDelete(comment.id)}>Delete</button> : null}
        </div>)
    }

    handlePostDelete = () => {
        if(this.props.user_id === this.props.currentUser.id){
        fetch(`http://localhost:3000/api/v1/posts/${this.props.id}`, {
            method: "DELETE"
        }).then(resp => resp.json())
        .then(data => this.props.renderPosts(this.props.id))
    }}

    handleEditPost = () => {
        this.setState({editPost: !this.state.editPost })  
    }

    handleEditPostSubmit = (event) => {
        event.preventDefault()
        if(this.props.user_id === this.props.currentUser.id){
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
        .then(data =>  {this.props.handleUpdatePost(data)})

        this.setState({ newContent: "" , userCaption: '', editPost: false })  
    }}

    handleAddComment = () => {
        this.setState({ addNewComment: !this.state.addNewComment})
    }

    

    render(){
        console.log(this.props)
        
    return(
        <div className = "userCardDiv">
        <Link to={`/posts/${this.props.id}`}>
            <img  className = "postImg" src={this.props.content} />
        </Link>
            <p>User Caption: {this.props.user_caption}</p>
            <p>{this.state.likes} Likes </p>

            {this.state.comments.length > 0 ? this.mapComments() : null}

            <Like handleLike = {this.handleLike}/>

            {this.props.user_id === this.props.currentUser.id ?
            <button className = "button" onClick = {this.handlePostDelete}>Delete Post</button> : null
            }
            
            {this.props.user_id === this.props.currentUser.id ?
            <button className = "button" onClick={this.handleEditPost}>Edit</button> : null
            }
            {this.state.editPost ? 
                <form onSubmit={this.handleEditPostSubmit}>
                    <label>content:</label>
                        <input type="text"
                            name="newContent"
                            value={this.state.newContent}
                            onChange={this.handleOnChange}/>
                    <label> User Caption:</label>
                        <input type="text"
                            name="userCaption"
                            value={this.state.userCaption}
                            onChange={this.handleOnChange}/>
                    <input type='Submit' value="Submit" />
                </form>
            : 
            null}  


            <button className = "button" onClick={this.handleAddComment}>AddComment</button>
            {this.state.addNewComment ? 
                <CommentForm comment = {this.state.addComment}
                handleChange = {this.handleOnChange}
                handleSubmit = {this.handleCommentSubmit}/>   
            : 
            null}


        </div>
    )
}}

export default PostCard