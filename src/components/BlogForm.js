import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Toggleable from './Toggleable'
import { Button, Form } from 'react-bootstrap'

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
            type: 'success'
        }, 3))
    }

    return (
        <Toggleable buttonLabel='create new blog' ref={blogFormRef}>
            <div className='formDiv'>
                <h2>create new</h2>
                <Form onSubmit={addBlog}>
                    <Form.Group>
                        <Form.Label>title:</Form.Label>
                        <Form.Control type="text"
                            name="title"/>
                        <Form.Label>author:</Form.Label>
                        <Form.Control type="text"
                            name="author"/>
                        <Form.Label>url:</Form.Label>
                        <Form.Control type="text"
                            name="url"/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        create
                    </Button>
                </Form>
            </div>
        </Toggleable>
    )
}

export default BlogForm