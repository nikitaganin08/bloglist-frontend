import React, { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/logins'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
    const dispatch = useDispatch()
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const blogFormRef = useRef()

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedAppUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
            blogService.getAll().then(blogs =>
                setBlogs(blogs)
            )
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
            console.log('User ', user.token)
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(setNotification({
                message: 'wrong username or password',
                type: 'error'
            }, 3))
        }
    }

    const createBlog = async (newBlog) => {
        blogFormRef.current.toggleVisibility()
        const savedBlog = await blogService.create(newBlog)
        setBlogs(blogs.concat(savedBlog))
        dispatch(setNotification({
            message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
            type: 'notification'
        }, 3))
    }

    const creatingBlogForm = () => {
        return (
            <Toggleable buttonLabel='create new blog' ref={blogFormRef}>
                <BlogForm createBlog={createBlog}/>
            </Toggleable>
        )
    }

    const clearToken = () => {
        setUser(null)
        return window.localStorage.clear()
    }

    const blogForm = () => {
        return <div>
            <h2>blogs</h2>
            <div>{user.name} logged in
                <button onClick={clearToken}>logout</button>
            </div>
            {creatingBlogForm()}
            {blogs
                .sort((blog, nextBlog) => nextBlog.likes - blog.likes)
                .map(blog =>
                    <Blog key={blog.id}
                        blog={blog}
                        toggleLike={() => toggleLike(blog.id)}
                        toggleDelete={() => toggleDelete(blog.id)}
                        loggedUser={user}
                    />
                )}
        </div>
    }

    const loginForm = () => {
        return <LoginForm
            handleLogin={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            username={username}
            password={password}/>
    }

    const toggleLike = async id => {
        const blog = blogs.find(b => b.id === id)
        const changedBlog = { ...blog, likes: blog.likes + 1 }

        try {
            const updatedBlog = await blogService.update(id, changedBlog)
            setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
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
                setBlogs(blogs.filter(blog => blog.id !== id))
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
            <Notification/>
            {user === null ?
                loginForm() :
                blogForm()}
        </div>
    )
}

export default App