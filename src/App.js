import React, {useEffect, useState} from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from "./components/Notification";
import blogService from './services/blogs'
import loginService from './services/logins'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [notification, setNotification] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedAppUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({username, password})
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

    const addBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url
        }
        const savedBlog = await blogService.create(newBlog)
        setBlogs(blogs.concat(savedBlog))
        addNotification({
            message: `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
            type: 'notification'
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    const addNotification = (notification) => {
        setNotification(notification)
        setTimeout(() => setNotification(null), 3000)
    }

    const handleBlogTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleBlogAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleBlogUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const loginForm = () => {
        return <form onSubmit={handleLogin}>
            <h2>log in to application</h2>
            <Notification notification={notification}/>
            <div>
                username
                <input type="text"
                       value={username}
                       name="Username"
                       onChange={({target}) => setUsername(target.value)}/>
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    }

    const creatingBlogForm = () => {
        return (
            <BlogForm
                add={addBlog}
                title={title}
                author={author}
                url={url}
                handleTitleChange={handleBlogTitleChange}
                handleAuthorChange={handleBlogAuthorChange}
                handleUrlChange={handleBlogUrlChange}
            />
        )
    }

    const clearToken = () => {
        setUser(null)
        return window.localStorage.clear()
    }

    const blogForm = () => {
        return <div>
            <h2>blogs</h2>
            <Notification notification={notification}/>
            <div>{user.name} logged in
                <button onClick={clearToken}>logout</button>
            </div>
            <h2>create new</h2>
            {creatingBlogForm()}
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>
            )}
        </div>
    }

    return (
        <div>
            {user === null ?
                loginForm() :
                blogForm()}
        </div>
    )
}

export default App