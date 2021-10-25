import userService from '../services/users'

const reducer = (state = [], action) => {
    switch (action.type) {
    case 'GET_USERS': {
        return action.data
    }
    default:
        return state
    }
}

export const getUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        console.log('userReducer', users)
        dispatch({
            type: 'GET_USERS',
            data: users
        })
    }
}

export default reducer