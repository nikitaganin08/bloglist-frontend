import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, toggleLike }) => {
    return (
        <div className='blog'>
            <div>
                {blog.title} {blog.author}
            </div>
            <div>likes {blog.likes}
                <button onClick={toggleLike}>like</button>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired
}


export default Blog