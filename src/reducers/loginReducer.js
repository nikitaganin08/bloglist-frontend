import loginService from '../services/logins'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
    switch (action.type) {
    case 'LOGIN_USER': {
        return action.data
    }
    case 'REMOVE_USER': {
        return ''
    }
    default:
        return state
    }
}


export const loginUser = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
            await blogService.setToken(user.token)
            dispatch({
                type: 'LOGIN_USER',
                data: user
            })
        } catch (exception) {
            console.log(exception)
            dispatch(setNotification({
                message: 'wrong username or password',
                type: 'danger'
            }, 3))
        }
    }
}

export const updateLoggedUser = (user) => {
    return async dispatch => {
        await blogService.setToken(user.token)
        dispatch({
            type: 'LOGIN_USER',
            data: user
        })
    }
}

export const clearUser = () => {
    return async dispatch => {
        window.localStorage.clear()
        dispatch({
            type: 'REMOVE_USER'
        })
    }
}

export default reducer