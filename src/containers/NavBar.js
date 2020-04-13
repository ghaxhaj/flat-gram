import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../styles.css'
// import SearchBar from '../components/SearchBar'

const NavBar = () => {
    return (
        <div className = "navBar">
          
            <img class= "logo" src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F48394057%2F258081453087%2F2%2Foriginal.png?w=225&auto=format%2Ccompress&q=75&sharp=10&s=1d4ef9cb6418dc61ebdbb3ab0b587963" />
        

            <NavLink className = "navBarComponent" to='/'>Home</NavLink>
          
            <NavLink className = "navBarComponent" to="/user">User</NavLink>
        
            <NavLink className = "navBarComponent" to="/">LogOut</NavLink>
        
            <input type="text" placeholder="Search.." className = "searchBar"/>

        </div>
    )
}

export default NavBar