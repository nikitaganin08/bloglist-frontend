import React from 'react'
import { Link } from 'react-router-dom'
import { clearUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'

const Menu = ({ loggedUser }) => {

    const dispatch = useDispatch()

    const padding = {
        paddingRight: 5
    }

    return (
        <div className='menu'>
            <Link style={padding} to='/'>blogs</Link>
            <Link style={padding} to='/users'>users</Link>
            {loggedUser.name} logged in
            <button onClick={() => dispatch(clearUser())}>logout</button>
        </div>
    )
}

export default Menu