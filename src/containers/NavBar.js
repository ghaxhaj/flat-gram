import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../Our.css'
import SearchBar from '../components/SearchBar'

const NavBar = () => {
    return (
        <div>
          
            <img src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F48394057%2F258081453087%2F2%2Foriginal.png?w=225&auto=format%2Ccompress&q=75&sharp=10&s=1d4ef9cb6418dc61ebdbb3ab0b587963" />
        

            <NavLink to='/'>Home</NavLink>
          
            <NavLink to="/user">User</NavLink>
        
            LogOut
        
            <SearchBar />

        </div>
    )
}

export default NavBar