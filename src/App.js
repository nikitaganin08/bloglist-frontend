import React, { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { updateLoggedUser } from './reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import User from './components/User'
import Blog from './components/Blog'
import Menu from './components/Menu'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedAppUser')
        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            dispatch(updateLoggedUser(user))
        }
    }, [dispatch])

    const loggedUser = useSelector(({ loggedUser }) => {
        return loggedUser
    })

    const users = useSelector(({ users }) => {
        return users
    })

    const match = useRouteMatch('/users/:id')
    const user = match
        ? users.find(user => user.id === match.params.id)
        : null


    const blogs = useSelector(({ blogs }) => {
        return blogs
    })

    const matchBlog = useRouteMatch('/blogs/:id')
    const blog = matchBlog
        ? blogs.find(blog => blog.id === matchBlog.params.id)
        : null

    const blogForm = () => {
        return <div>
            <Menu loggedUser={loggedUser}/>
            <Switch>
                <Route path='/blogs/:id'>
                    <Blog blog={blog}/>
                </Route>
                <Route path='/users/:id'>
                    <User user={user}/>
                </Route>
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
        <div className="container">
            <Notification/>
            {loggedUser.length === 0 ? <LoginForm/> : blogForm()}
        </div>
    )
}

export default App