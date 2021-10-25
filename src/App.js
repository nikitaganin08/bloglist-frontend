import React, { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { clearUser, updateLoggedUser } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import UserList from './components/UserList'
import { Route, Switch } from 'react-router-dom'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedAppUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            dispatch(updateLoggedUser(user))
        }
    }, [dispatch])

    const user = useSelector(({ loggedUser }) => {
        return loggedUser
    })

    const blogForm = () => {
        return <div>
            <h2>blogs</h2>
            <div>{user.name} logged in
                <button onClick={() => dispatch(clearUser())}>logout</button>
            </div>
            <BlogForm/>
            <Switch>
                <Route path='/users'>
                    <UserList/>
                </Route>
                <Route path='/'>
                    <BlogList/>
                </Route>
            </Switch>
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