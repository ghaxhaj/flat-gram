import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../styles.css'
import UserController from './UserController'
import Posts from './Posts'
import ShowSingleUser from './ShowSingleUser' 
import Profil from './Profil' 
import SearchBar from './SearchBar'


const NavBar = (props) => {
    
    console.log('****navbar props ***' , props.currentUser)
    let id = props.currentUser
    return (
        <div className= "navBar">
            <div className= "logo">
                <img className= "logoI" src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F48394057%2F258081453087%2F2%2Foriginal.png?w=225&auto=format%2Ccompress&q=75&sharp=10&s=1d4ef9cb6418dc61ebdbb3ab0b587963" /> </div>
            <div className= "logo">
                <UserController  logout={props.logout} currentUser={props.currentUser} /> </div>
            
            <div className= "logo">
                <NavLink  to='/posts'>Home</NavLink> </div>
            
            <div className= "logo">
                <NavLink  to='/users'>Users</NavLink> </div>
            
            <div className= "logo">
                <NavLink  to="/users/login">Profil</NavLink> </div>

            {/* <div className= "searchBar">
                    <SearchBar />
                </div> */}

                
            
            {/* <div className= "logo">
                <NavLink  to="/">LogOut</NavLink> </div> */}
            
            {/* <div className= "logo">
                <input className= "logo" type="text" placeholder="Search.." className = "searchBar"/> </div> */}
          
        </div>
    )
}

export default NavBar