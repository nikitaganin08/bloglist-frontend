import React, { useEffect, useRef, useState } from 'react'
import BlogList from './components/BlogList'
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

    const creatingBlogForm = () => {
        return (
            <Toggleable buttonLabel='create new blog' ref={blogFormRef}>
                <BlogForm/>
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
            <BlogList/>
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