import React from 'react'
import Post from '../components/Post'

class PostContainer extends React.Component {

renderPosts = () => {
    return this.props.posts.map(post => <Post key={post.id} {...post} />)}

    render(){

        return (
            <div>
                {this.renderPosts()}
            </div>
        )
    }
}

export default PostContainer