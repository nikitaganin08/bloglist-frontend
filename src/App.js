import React, { useEffect, useState, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/logins'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notification, setNotification] = useState(null)
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
            addNotification({
                message: 'wrong username or password',
                type: 'error'
            })
        }
    }

    const createBlog = async (newBlog) => {
        blogFormRef.current.toggleVisibility()
        const savedBlog = await blogService.create(newBlog)
        setBlogs(blogs.concat(savedBlog))
        addNotification({
            message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
            type: 'notification'
        })
    }

    const addNotification = (notification) => {
        setNotification(notification)
        setTimeout(() => setNotification(null), 3000)
    }

    const creatingBlogForm = () => {
        return (
            <Toggleable buttonLabel = 'create new blog' ref={blogFormRef}>
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
            {blogs.map(blog =>
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
            password={password} />
    }

    const toggleLike = async id => {
        const blog = blogs.find(b => b.id === id)
        const changedBlog = { ...blog, likes: blog.likes + 1 }

        try {
            const updatedBlog = await blogService.update(id, changedBlog)
            setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
        } catch(exception) {
            addNotification({
                message: `Blog '${blog.content}' was already removed from server`,
                type: 'error'
            })
        }
    }

    const toggleDelete = async id => {
        const blogToRemove = blogs.find(b => b.id === id)
        if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)) {
            try {
                await blogService.remove(id)
                setBlogs(blogs.filter(blog => blog.id !== id))
            } catch (exception) {
                addNotification({
                    message: `Blog '${blogToRemove.content}' was already removed from server`,
                    type: 'error'
                })
            }
        }
    }

    return (
        <div>
            <Notification notification={notification}/>
            {user === null ?
                loginForm() :
                blogForm()}
        </div>
    )
}

export default App