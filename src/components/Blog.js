import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog }) => {
    return (
        <div className='blog'>
            {blog.title} {blog.author}
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired
}


export default Blog