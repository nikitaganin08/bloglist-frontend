import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs, likeBlog, removeBlog } from '../reducers/blogReducer'
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

    const showRemoveButton = (blog) => {
        return { display: blog.user.username === blog.user.username ? '' : 'none' }
    }

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

    const remove = (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                dispatch(removeBlog(blog.id))
            } catch (exception) {
                dispatch(setNotification({
                    message: `Blog '${blog.content}' was already removed from server`,
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
                            <button onClick={() => like(blog)}>like</button>
                        </div>
                        <div>{blog.user.name}</div>
                        <div style={showRemoveButton(blog)}>
                            <button onClick={() => remove(blog)}>remove</button>
                        </div>
                    </div>)
            }
        </div>
    )
}

export default BlogList