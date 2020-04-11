import React from 'react'
import '../styles.css'


const Comment = (props) => {
    return(
        <form>
            <label>Comment:</label>
            <input type="text"
            name="addComment"
            value={props.comment}
            onChange={props.handleChange}/>
            <button onClick={props.handleSubmit} className = "button">Add Comment</button>
            
        </form>
    )
}

export default Comment