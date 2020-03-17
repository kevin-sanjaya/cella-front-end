import React from 'react';

import route from '../route';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

function NavigationBar(props) {
  return (
    <div className="NavigationBar">
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {route.map(route => (<Link className="nav-link" key={route.id} to={route.url}>{route.name}</Link>))}
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="PT. Sumber Bahagia" className="mr-sm-2" disabled />
            <Button variant="outline-secondary">Log Out</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
