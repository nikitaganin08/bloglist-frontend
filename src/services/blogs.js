import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (newBlog) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

const update = async (newObject) => {
    const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return response.data
}

const comment = async (blog, comment) => {
    const request = {
        user: blog.user,
        comment: comment
    }
    const response = await axios.post(`${baseUrl}/${blog.id}/comments`, request)
    return response.data
}

const blogService = { getAll, create, setToken, update, remove, comment }

export default blogService