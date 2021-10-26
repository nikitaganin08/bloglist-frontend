import blogService from '../services/blogs'

const reducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT':
        return action.data
    case 'CREATE_BLOG':
        return [...state, action.data]
    case 'LIKE': {
        const id = action.data.id
        const blog = state.find(b => b.id === id)
        const changedBlog = { ...blog, likes: blog.likes + 1 }
        return state.map(blog => blog.id === id ? changedBlog : blog)
    }
    case 'REMOVE_BLOG': {
        const id = action.data
        return state.filter(blog => blog.id !== id)
    }
    default:
        return state
    }
}

export const createBlog = (newBlog) => {
    return async dispatch => {
        const blog = await blogService.create(newBlog)
        dispatch({
            type: 'CREATE_BLOG',
            data: blog
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: id
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const updateBlog = await blogService.update(blog)
        dispatch({
            type: 'LIKE',
            data: updateBlog
        })
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT',
            data: blogs
        })
    }
}

export default reducer