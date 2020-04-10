import React from 'react'
import PostContainer from '../containers/PostContainer'
import FollowersContainer from '../containers/FollowersContainer'

class UserContainer extends React.Component {

    state = {
        posts: []
    }

    componentDidMount(){
        fetch('http://localhost:3000/api/v1/posts').then(resp => resp.json()).then(posts => this.setState({posts: posts}))
    }

    render(){

        return (
            <div>
                <h1></h1>
                <PostContainer posts ={this.state.posts}/>
                <FollowersContainer />
            </div>
        )
    }
}

export default UserContainer