import React from 'react'
import PostContainer from '../containers/PostContainer'
import FollowersContainer from '../containers/FollowersContainer'


class UserContainer extends React.Component {

    state = {
        posts: [],
        addedUrl: '',
        addedCaption: '',
        clicked: false
    }

    componentDidMount(){
        fetch('http://localhost:3000/api/v1/posts').then(resp => resp.json()).then(posts => this.setState({posts: posts}))
    }

    handleOnChange = (event) => {

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        
        let data = {
            user_id: 1, 
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
        .then(post => this.setState({
            posts: [...this.state.posts, post],
            addedUrl: '',
            addedCaption: '',
            clicked: false})
        )}

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

        handleUpdatePost = (postId, newContent, NewUserCaption) => {
            let newPosts = this.state.posts.map(post => {
                if (post.id===postId){
                    // console.log(post)
                    let postToUpdate = {...post,
                    content: newContent,
                    user_caption: NewUserCaption }
                    return postToUpdate
                }else {
                    return post
                }
            })
            this.setState({posts: newPosts})
        }
    

    render(){
        // console.log(this.state)
        return (
            <div>
                <h1></h1>
                <PostContainer posts ={this.state.posts} 
                clicked = {this.state.clicked}
                addUrl = {this.state.addedUrl}
                addedCaption = {this.state.addedCaption}
                handleOnChange = {this.handleOnChange} 
                handleSubmit = {this.handleSubmit}
                handleButtonClick = {this.renderPostForm}
                renderPosts = {this.handleDeletePost}
                handleEdit = {this.handleUpdatePost}/>
                <FollowersContainer />
            </div>
        )
    }
}

export default UserContainer