import { applyMiddleware, combineReducers, createStore } from 'redux'
import notificationReducer from '../reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogReducer from '../reducers/blogReducer'
import loginReducer from '../reducers/loginReducer'
import userReducer from '../reducers/userReducer'

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    loggedUser: loginReducer,
    users: userReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store