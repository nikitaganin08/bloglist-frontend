import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Toggleable from './Toggleable'

const BlogForm = () => {

    const dispatch = useDispatch()
    const blogFormRef = useRef()

    const addBlog = async (event) => {
        event.preventDefault()
        blogFormRef.current.toggleVisibility()
        const title = event.target.title.value
        const author = event.target.author.value
        const url = event.target.url.value

        const newBlog = {
            title: title,
            author: author,
            url: url
        }
        dispatch(createBlog(newBlog))
        dispatch(setNotification({
            message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
            type: 'notification'
        }, 3))
    }

    return (
        <Toggleable buttonLabel='create new blog' ref={blogFormRef}>
            <div className='formDiv'>
                <h2>create new</h2>
                <form onSubmit={addBlog}>
                    <div>title: <input id='title'/></div>
                    <div>author: <input id='author'/></div>
                    <div>url: <input id='url'/></div>
                    <div>
                        <button id="create-button" type="submit">create</button>
                    </div>
                </form>
            </div>
        </Toggleable>
    )
}

export default BlogForm