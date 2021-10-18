import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

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

    const showRemoveButton = async blog => {
        return { display: blog.user.username === blog.user.username ? '' : 'none' }
    }

    const toggleLike = async id => {
        const blog = blogs.find(b => b.id === id)
        const changedBlog = { ...blog, likes: blog.likes + 1 }

        try {
            // eslint-disable-next-line no-unused-vars
            const updatedBlog = await blogService.update(id, changedBlog)
            // setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
        } catch (exception) {
            dispatch(setNotification({
                message: `Blog '${blog.content}' was already removed from server`,
                type: 'error'
            }, 3))
        }
    }

    const toggleDelete = async id => {
        const blogToRemove = blogs.find(b => b.id === id)
        if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)) {
            try {
                await blogService.remove(id)
                // setBlogs(blogs.filter(blog => blog.id !== id))
            } catch (exception) {
                dispatch(setNotification({
                    message: `Blog '${blogToRemove.content}' was already removed from server`,
                    type: 'error'
                }, 3))
            }
        }
    }

    return (
        <div>
            {blogs.sort((blog, nextBlog) => nextBlog.likes - blog.likes)
                .map(blog =>
                    <div key={blog.id} className='blog' style={blogStyle}>
                        <div>
                            {blog.title} {blog.author}
                        </div>
                        <div>
                            <span>likes </span>
                            <span className='likes'>{blog.likes}</span>
                            <button onClick={toggleLike}>like</button>
                        </div>
                        <div>{blog.user.name}</div>
                        <div style={showRemoveButton(blog)}>
                            <button onClick={toggleDelete}>remove</button>
                        </div>
                    </div>)
            }
        </div>
    )
}

export default BlogList