import React from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/loginReducer'

const LoginForm = () => {

    const dispatch = useDispatch()

    const login = async (event) => {
        event.preventDefault()
        try {
            const username = event.target.username.value
            const password = event.target.password.value

            dispatch(loginUser(username, password))
        } catch (exception) {
            dispatch(setNotification({
                message: 'wrong username or password',
                type: 'error'
            }, 3))
        }
    }

    return (
        <form onSubmit={login}>
            <h2>log in to application</h2>
            <div>
                username
                <input
                    id="username"
                    type="text"/>
            </div>
            <div>
                password
                <input
                    id="password"
                    type="password"/>
            </div>
            <button id="login-button" type="submit">login</button>
        </form>
    )
}

export default LoginForm