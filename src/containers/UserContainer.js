import React, {Component} from 'react'
import Users from '../components/Users'
import ShowSingleUser from '../components/ShowSingleUser'
import { withRouter } from "react-router";
 


class UserContainer extends Component {

    state = {
        users: [],
        
    }

    componentDidMount(){
        fetch('http://localhost:3000/api/v1/users')
        .then(resp => resp.json())
        .then(users => this.setState({users}))
    }
    deleteProfil = (UserTODelelte) => {
        console.log('user to delete ****' , UserTODelelte)
        let newUsers = this.state.users.filter(user => user.id !== UserTODelelte.id)
        this.setState({users: newUsers})
    }
<<<<<<< HEAD

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
=======
>>>>>>> Granito
    
    handleUpdateProfil = (updatedProfil) => {
        let newUsers = this.state.users.map(user => {
            if (user.id===updatedProfil.id){
                return updatedProfil
            }else {
                return user
            }
        })
        this.setState({users: newUsers})
    }
    render(){
      
        return (
            <div>
                <h1></h1>
<<<<<<< HEAD
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
=======
                <Users users ={this.state.users} 
                handleUpdateProfil={this.handleUpdateProfil}  
                deleteProfil={this.deleteProfil}  
                currentUser={this.props.currentUser}

                />
>>>>>>> Granito
            </div>
        )
    }
}
export default UserContainer
