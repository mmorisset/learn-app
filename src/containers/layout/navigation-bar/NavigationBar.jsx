import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import NavbarLoggedTeacher from './NavbarLoggedTeacher';
import NavBarUnloggedActions from './NavBarUnloggedActions';

class NavigationBar extends Component {
  render() {
    const { loggedTeacher, onLoggedTeacherChange, onTokenChange } = this.props;
    let rightNavContent;
    if (loggedTeacher) {
      rightNavContent = (
        <NavbarLoggedTeacher
          loggedTeacher={loggedTeacher}
          onLoggedTeacherChange={onLoggedTeacherChange}
          onTokenChange={onTokenChange}
        />
      );
    } else {
      rightNavContent = <NavBarUnloggedActions />;
    }
    return (
      <Navbar bg="light" expand="sm">
        <Navbar.Brand>
          <Link to="/">Learn App</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {rightNavContent}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
