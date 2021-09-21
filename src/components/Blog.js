import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, toggleLike, toggleDelete, loggedUser }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const showRemoveButton = { display: blog.user.username === loggedUser.username ? '' : 'none' }

    return (
        <div className='blog' style={blogStyle}>
            <div>
                {blog.title} {blog.author}
            </div>
            <div>likes {blog.likes}
                <button onClick={toggleLike}>like</button>
            </div>
            <div>{blog.user.name}</div>
            <div style={showRemoveButton}>
                <button onClick={toggleDelete}>remove</button>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired
}


export default Blog