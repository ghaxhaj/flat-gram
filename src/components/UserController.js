import React from 'react'
import { Link } from 'react-router-dom'
import '../styles.css'

function UserController(props){
  return (
    <div className="user-controls">
    {
        props.currentUser ? <button onClick={props.logout}>
            <span role="img" aria-label="user-controls">
                {props.currentUser ? 'Hi  : ' + props.currentUser.userName + ' -->logout': "👤"} 👌
            </span>
      </button> 
      :
      <div>
      <Link to="/login"><button className="login">LOG IN</button></Link>
      <Link to="/signup"><button className="signup">SIGN UP</button></Link>

      </div>

    }
      {/* <button onClick={props.logout}>
            <span role="img" aria-label="user-controls">
                {props.currentUser ? 'Hi  : ' + props.currentUser.userName : "👤"} 
            </span>
      </button> */}
    </div>
  )
}

export default UserController