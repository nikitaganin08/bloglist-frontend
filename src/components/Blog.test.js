import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import BlogList from './BlogList'
import { render } from '@testing-library/react'

test('renders content', () => {
    const blog = {
        title: 'Component testing',
        author: 'Test Test',
        url: 'http://localhost'
    }

    const component = render(
        <BlogList blog={blog}/>
    )

    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('Component testing')
    expect(div).toHaveTextContent('Test Test')
    expect(div).not.toHaveTextContent('http://localhost')
})