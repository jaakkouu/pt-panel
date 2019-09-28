import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Navbar from 'react-bootstrap/Navbar'

const NavigationBar = ({props}) => {
    return <Navbar bg="light" variant="light">
        <Navbar.Brand href="/">GetFit Oy</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link active={props.pathname === "/" ? true : false} href="/">Home</Nav.Link>
            <Nav.Link active={props.pathname === "/customers" ? true : false} href="/customers">Customers</Nav.Link>
            <Nav.Link active={props.pathname === "/trainings" ? true : false} href="/trainings">Trainings</Nav.Link>
        </Nav>
        <Form inline>
            <FormControl type="text" onChange={() => console.log('asd')} placeholder="Search for customers, trainings..." className="mr-sm-2" />
        </Form>
    </Navbar>
}

export default NavigationBar;