import React, {Component} from 'react'

import ShowSinglePost from '../components/Posts'
import Posts from '../components/Posts'


class PostContainer extends Component {

    renderPosts = () => {

        return this.props.posts.map(post => <Posts key={post.id} 
            renderPosts = {this.props.renderPosts}
            updatePost = {this.props.handleEdit} 
            {...post} 
            currentUser = {this.props.currentUser}
            />)
    }

    state = {
        posts: [],
        addedUrl: '',
        addedCaption: '',
        clicked: false
    }

    componentDidMount(){
        // console.log('mounted')
        fetch('http://localhost:3000/api/v1/posts')
        .then(resp => resp.json())
        .then(posts => this.setState({posts}) )
    }

    handleOnChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        
        let data = {
            user_id: this.props.currentUser.id, 
            content: this.state.addedUrl,
            user_caption: this.state.addedCaption
        }

        fetch('http://localhost:3000/api/v1/posts', {
            method: "POST",
            headers: {"Content-Type": "application/json",
            "Accept": "application/json"},    
            body: JSON.stringify(data)
        })

        .then(resp=>resp.json())
        // .then(console.log)
        .then(post => {
            let newPost = {...post, user:{userName: this.props.currentUser.userName}}
            this.setState({
            posts: [...this.state.posts, newPost],
            addedUrl: '',
            addedCaption: '',
            clicked: false})
            })
    }

        renderPostForm = () => {
            this.setState({
                clicked: !this.state.clicked
            })
        }

        handleDeletePost = (postId) => {
            // console.log(postId)
            let newPosts = this.state.posts.filter(post => post.id !== postId)
            this.setState({posts: newPosts})
        }

        handleUpdatePost = (updatedPost) => {
            let newPosts = this.state.posts.map(post => {
                if (post.id===updatedPost.id){
                    return updatedPost
                }else {
                    return post
                }
            })
            this.setState({posts: newPosts})
        }
    render(){
        // console.log("****posts***" , this.state.posts)
        
        return (
            <div>
                <h1></h1>
                <Posts posts ={this.state.posts} 
                clicked = {this.state.clicked}
                addUrl = {this.state.addedUrl}
                addedCaption = {this.state.addedCaption}
                handleOnChange = {this.handleOnChange} 
                handleSubmit = {this.handleSubmit}
                handleButtonClick = {this.renderPostForm}
                renderPosts = {this.handleDeletePost}
                handleUpdatePost={this.handleUpdatePost}
                currentUser = {this.props.currentUser}
                />
                
               
            </div>
        )
    }
}

export default PostContainer