import React from 'react'
import { likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {

    if (!blog) {
        return null
    }

    const dispatch = useDispatch()

    const like = (blog) => {
        try {
            dispatch(likeBlog(blog))
        } catch (exception) {
            dispatch(setNotification({
                message: `Blog '${blog.content}' was already removed from server`,
                type: 'error'
            }, 3))
        }
    }
    return (
        <div>
            <h2>{blog.title}</h2>
            <div><a href={blog.url}>{blog.url}</a></div>
            <div>
                <span className='likes'>{blog.likes}</span>
                <span> likes</span>
                <button onClick={() => like(blog)}>like</button>
                <div>added by {blog.user.name}</div>
            </div>
        </div>
    )
}

export default Blog