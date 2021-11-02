import React from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import { Button, Form } from 'react-bootstrap'

const LoginForm = () => {

    const dispatch = useDispatch()

    const login = async (event) => {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value

        dispatch(loginUser(username, password))
    }

    return (
        <div>
            <h2>log in to application</h2>
            <Form onSubmit={login}>
                <Form.Group>
                    <Form.Label>username:</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"/>
                    <Form.Label>password:</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"/>
                    <Button variant="primary" type="submit">
                        login
                    </Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default LoginForm