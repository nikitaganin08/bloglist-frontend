import React, { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { clearUser, updateLoggedUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedAppUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            dispatch(updateLoggedUser(user))
        }
    }, [dispatch])

    const user = useSelector(({ user }) => {
        return user
    })

    const blogForm = () => {
        return <div>
            <h2>blogs</h2>
            <div>{user.name} logged in
                <button onClick={() => dispatch(clearUser())}>logout</button>
            </div>
            <BlogForm/>
            <BlogList/>
        </div>
    }
    return (
        <div>
            <Notification/>
            {user.length === 0 ? <LoginForm/> : blogForm()}
        </div>
    )
}

export default App