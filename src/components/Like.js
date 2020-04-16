import React from 'react'
import '../styles.css'


const Like = (props) => {
    return(
        <button className = "button" onClick = {props.handleLike}> Like </button>
    )
}

export default Like