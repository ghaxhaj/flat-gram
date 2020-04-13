import React from 'react'
import Post from '../components/Post'
import PostForm from '../components/PostForm'
import '../styles.css'


class PostContainer extends React.Component {

  

renderPosts = () => {
    return this.props.posts.map(post => <Post key={post.id} {...post} />)}



    render(){

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

export default PostContainer