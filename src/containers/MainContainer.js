import React, {Component} from 'react' 
import UserContainer from '../containers/UserContainer'
import PostContainer from '../containers/PostContainer'

class MainContainer extends Component {

    render(){

        return (
            <div>
                <PostContainer />
                <UserContainer />
            </div>
        )
    }
}
export default MainContainer
