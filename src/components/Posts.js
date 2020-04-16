import React, {Component} from 'react'
import PostCard from './PostCard'
import PostForm from './PostForm'
import CommentForm from './CommentForm'
import Like from './Like'
import '../styles.css'


class Posts extends Component {


    renderPosts = () => {
        if (this.props.posts){
        return this.props.posts.map(post => {
            return <PostCard key={post.id} 
            renderPosts = {this.props.renderPosts} {...post} 
            handleUpdatePost={this.props.handleUpdatePost} 
            currentUser = {this.props.currentUser}/>
            }
        )}
        }

    render(){
            // console.log('***props***' , this.props)
        return (
            <div>
                {this.props.clicked ? 
                <PostForm 
                image = {this.props.addUrl}
                caption = {this.props.addedCaption}
                handleChange = {this.props.handleOnChange}
                handleSubmit = {this.props.handleSubmit}/> :
                <button onClick={this.props.handleButtonClick} className = "button">Add a Post</button>}

                {this.renderPosts()}
            </div>
        )
    }
}

export default Posts