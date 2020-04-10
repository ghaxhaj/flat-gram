import React from 'react'
import { Link } from 'react-router-dom'
import '../Our.css'

const NavBar = () => {
    return (
        <nav className ="topnav">
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to='/followers'>Followers</Link>
          </li>
        </ul>
      </nav>
    )
}

export default NavBar