import { applyMiddleware, combineReducers, createStore } from 'redux'
import notificationReducer from '../reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogReducer from '../reducers/blogReducer'

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store