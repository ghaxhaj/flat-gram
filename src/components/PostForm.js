import React from 'react'
import '../styles.css'

const PostForm = (props) => {
    return(
        <form>
            <label>Add Image Url</label>
            <input type="text" name = "addedUrl" value = {props.image} onChange = {props.handleChange}/>
            <label>Add Caption</label>
            <input type="text" name = "addedCaption" value = {props.caption} onChange = {props.handleChange}/>
            <button onClick = {props.handleSubmit} className = "button">Submit Post</button>
        </form>
    )
} 

export default PostForm
