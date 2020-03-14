import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

function NavigationBar() {
  return (
    <div className="NavigationBar">
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {pageList.map(parent => (<NavDropdown key={parent.id} title={parent.parentPage}>
              { parent.childPages.map((child, index) => (<NavDropdown.Item key={index} onClick={switchPage}>{ child }</NavDropdown.Item>))}
            </NavDropdown>))}
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

const pageList = [
  { id: 1, parentPage: 'Kontrol', childPages: ['Kandang', 'Hewan'] },
  { id: 2, parentPage: 'Stock', childPages: ['Pakan', 'Vitamin'] },
  { id: 3, parentPage: 'Pekerja', childPages: ['Data', 'Kontrak'] },
  { id: 4, parentPage: 'Jadwal', childPages: ['Pekerja', 'Panen', 'Servis'] },
  { id: 5, parentPage: 'Laporan', childPages: ['Panen', 'Anomali', 'Biaya'] }
];

const switchPage = () => console.log('switch route');

export default NavigationBar;
