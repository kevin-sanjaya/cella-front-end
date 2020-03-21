import React from 'react';

import route from '../../route';

import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

import { LinkContainer } from 'react-router-bootstrap'

function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {route.map(route => (<NavDropdown title={route.name} key={route.id}>
            {route.child.map(child => (<LinkContainer key={child.id} to={`${route.url}${child.url}`}>
              <NavDropdown.Item>{child.name}</NavDropdown.Item>
            </LinkContainer>))}
          </NavDropdown>))}
        </Nav>
        <Form inline style={userTileStyle}>
          <Image src="https://image.flaticon.com/icons/png/512/194/194938.png" style={userAvatarStyle} roundedCircle />
          <Dropdown>
            <Dropdown.Toggle style={userDropdownStyle}>
              Dwi Ario Setiadi
              </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Keluar</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

const userAvatarStyle = {
  width: '40px',
  height: '40px'
};

const userTileStyle = {
  width: '220px',
  backgroundColor: '#f5f5f5',
  paddingLeft: '8px',
  position: 'absolute',
  height: '56px',
  top: '0px',
  right: '0px'
};

const userDropdownStyle = {
  background: 'none',
  border: 'none',
  outline: 'none',
  color: 'black',
  boxShadow: 'none'
}

export default NavigationBar;
