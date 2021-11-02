import React from 'react'
import { commentBlog, likeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Button, Form } from 'react-bootstrap'

const Blog = ({ blog }) => {

    if (!blog) {
        return null
    }

    const dispatch = useDispatch()

    const comment = (event, blog) => {
        event.preventDefault()
        dispatch(commentBlog(blog, event.target.comment.value))
    }

    return (
        <div>
            <h2>{blog.title}</h2>
            <div><a href={blog.url}>{blog.url}</a></div>
            <div>
                <span className='likes'>{blog.likes}</span>
                <span> likes</span>
                <button onClick={() => dispatch(likeBlog(blog))}>like</button>
                <div>added by {blog.user.name}</div>
            </div>
            <h2>comments</h2>
            <Form onSubmit={event => comment(event, blog)}>
                <Form.Group>
                    <Form.Control type="text"
                        name="comment"/>
                    <Button variant="primary" type="submit">
                        add comment
                    </Button>
                </Form.Group>
            </Form>
            <ul className="list-group">
                {blog.comments.map(comment =>
                    <li className="list-group-item" key={comment.id}>{comment.comment}</li>
                )}
            </ul>
        </div>
    )
}

export default Blog