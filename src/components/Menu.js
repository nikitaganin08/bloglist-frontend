import React from 'react'
import { Link } from 'react-router-dom'
import { clearUser } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { Button, Nav, Navbar } from 'react-bootstrap'

const Menu = ({ loggedUser }) => {

    const dispatch = useDispatch()

    const padding = {
        paddingRight: 5
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/">blogs</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        <Link style={padding} to="/users">users</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                        {loggedUser
                            ? <em style={padding}>{loggedUser.name} logged in</em>
                            : <Link style={padding} to="/login">login</Link>
                        }
                    </Nav.Link>
                    <Button variant="secondary" size="sm" type="submit" onClick={() => dispatch(clearUser())}>
                        logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Menu