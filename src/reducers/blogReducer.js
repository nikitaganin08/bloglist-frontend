import blogService from '../services/blogs'

const reducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT':
        return action.data
    case 'CREATE':
        return [...state, action.data]
    default:
        return state
    }
}

export const createBlog = (newBlog) => {
    return async dispatch => {
        const blog = await blogService.create(newBlog)
        dispatch({
            type: 'CREATE',
            data: blog
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