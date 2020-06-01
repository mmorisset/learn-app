import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import NavBarUnloggedActions from './NavBarUnloggedActions';
import NavBarloggedTeacher from './NavBarloggedTeacher';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const loggedTeacher = this.props.loggedTeacher;
    let rightNavContent;
    if (loggedTeacher) {
      rightNavContent = <NavBarloggedTeacher
        loggedTeacher = { loggedTeacher }
        onLoggedTeacherChange = { this.props.onLoggedTeacherChange }
        onTokenChange = { this.props.onTokenChange }/>;
    } else {
      rightNavContent = <NavBarUnloggedActions/>;
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
