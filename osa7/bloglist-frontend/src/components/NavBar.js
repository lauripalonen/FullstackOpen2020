import React from 'react'
import { useDispatch } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'
import { clearNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

import { useHistory } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'


const NavBar = ({ loggedUser }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(userLogout())
    dispatch(clearNotification())
    history.push('/login')
  }

  const padding = {
    padding: 5
  }

  if (loggedUser) {
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link to='/blogs' style={padding}>blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to='/users' style={padding}>users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {loggedUser.name} logged in <button onClick={handleLogout}>log out</button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )

    // return (
    //   <div className='top-bar'>
    //     <Link to='/blogs' style={padding}>blogs</Link>
    //     <Link to='/users' style={padding}>users</Link>
    //     {loggedUser.name} logged in <button onClick={handleLogout}>log out</button>
    //   </div>
    // )
  }
  return (<div></div>)
}

export default NavBar