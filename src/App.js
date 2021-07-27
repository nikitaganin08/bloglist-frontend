import React, {useEffect, useState} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/logins'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedAppUser')
        if (loggedUser) {
            const user = JSON.stringify(loggedUser)
            setUser(user)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({username, password})
            window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exceptions) {
            setError('Wrong credentials')
            setTimeout(() => setError(null), 5000)
        }
    }

    const loginForm = () => {
        return <form onSubmit={handleLogin}>
            <h2>log in to application</h2>
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
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog}/>
            )}
        </div>
    }

    return (
        <div>
            {user === null ? loginForm() : blogForm()}
        </div>
    )
}

export default App