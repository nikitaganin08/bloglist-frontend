import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import BlogForm from './BlogForm'

const BlogList = () => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initBlogs())
    }, [dispatch])

    const blogs = useSelector(({ blogs }) => {
        return blogs.sort((blog, nextBlog) => nextBlog.likes - blog.likes)
    })

    return (
        <div>
            <h2>blog app</h2>
            <BlogForm/>
            {blogs.sort((blog, nextBlog) => nextBlog.likes - blog.likes)
                .map(blog =>
                    <div key={blog.id} className='blog' style={blogStyle}>
                        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </div>)
            }
        </div>
    )
}

export default BlogList