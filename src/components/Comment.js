import React from 'react'

const Comment = (props) => {
    return(
        <form>
            <label>Comment:</label>
            <input type="text"
            name="addComment"
            value={props.comment}
            onChange={props.handleChange}/>
            <button onClick={props.handleSubmit}>Add Comment</button>
            
        </form>
    )
}

export default Comment