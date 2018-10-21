import React, { Component } from 'react';
import axios from 'axios';
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./navbar-client.css";


class NavbarClient extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    console.log('logging out');
    axios
      .post('/user/logout')
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null,
          });
        }
      })
      .catch(error => {
        console.log('Logout error');
        console.log(error);
      });
  }

  render() {
    const loggedIn = true;
    console.log('navbar render, props: ');
    console.log(this.props);

    return (
      <div>
        <Navbar className='clientNav' >
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">
                Logo
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className='styleNav'>
              <NavItem eventKey={1} href="#" className='itesmNav' >
                <Link to="/" >
                  Home
                </Link>
              </NavItem>
              <NavItem eventKey={2} href="#" className='itesmNav' >
                <Link to="/ajustes" >
                  Ajustes
                </Link>
              </NavItem>
              <NavItem eventKey={2} href="#" className='itesmNav' >
                <Link to="/notificaciones" >
                  Notificaciones
                </Link>
              </NavItem>
            </Nav>
            <Nav pullRight = {true} >
              <NavItem eventKey={2} href="#" >
                <Link to="/login">
                  Logout
                </Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavbarClient;