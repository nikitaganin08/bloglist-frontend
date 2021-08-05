import React from "react"

const BlogForm = (props) => {
    const {title, author, url, add, handleTitleChange, handleAuthorChange, handleUrlChange} = props
    return (
        <form onSubmit={add}>
            <div>title: <input value={title} onChange={handleTitleChange}/></div>
            <div>author: <input value={author} onChange={handleAuthorChange}/></div>
            <div>url: <input value={url} onChange={handleUrlChange}/></div>
            <div>
                <button type="submit">create</button>
            </div>
        </form>
    )
}

export default BlogForm