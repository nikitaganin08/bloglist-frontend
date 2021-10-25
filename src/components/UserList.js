import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/userReducer'

const UserList = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const users = useSelector(({ users }) => {
        console.log('userList', users)
        return users
    })

    return (
        <div>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <td>&nbsp;</td>
                        <th>blogs created</th>
                    </tr>
                    {users
                        .map(user =>
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </div>
    )
}

export default UserList