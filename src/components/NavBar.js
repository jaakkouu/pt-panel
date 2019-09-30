import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const NavigationBar = ({history}) => {
    return <Navbar bg="light" variant="light">
        <Navbar.Brand href="/">GetFit Oy</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link active={history.pathname === "/" ? true : false} href="/">Home</Nav.Link>
            <Nav.Link active={history.pathname === "/customers" ? true : false} href="/customers">Customers</Nav.Link>
            <Nav.Link active={history.pathname === "/trainings" ? true : false} href="/trainings">Trainings</Nav.Link>
        </Nav>
      </Navbar>
}

export default NavigationBar;