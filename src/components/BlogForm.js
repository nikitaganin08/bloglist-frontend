import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleBlogTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleBlogAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleBlogUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url
        }
        createBlog(newBlog)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>title: <input value={title} onChange={handleBlogTitleChange}/></div>
                <div>author: <input value={author} onChange={handleBlogAuthorChange}/></div>
                <div>url: <input value={url} onChange={handleBlogUrlChange}/></div>
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm