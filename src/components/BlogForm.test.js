import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> create new blog', () => {
    const createBlog = jest.fn()
    const component = render(
        <BlogForm createBlog={createBlog}/>
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
        target: { value: 'test title' }
    })
    fireEvent.change(author, {
        target: { value: 'test author' }
    })
    fireEvent.change(url, {
        target: { value: 'test url' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
})