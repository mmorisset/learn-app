import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const CollapsedNavLink = styled(Link)`
  ${breakpoint('xs', 'sm')`
    margin-left: auto;
    margin-right: auto;
  `}
`;

const RegisterLink = styled(CollapsedNavLink)`
  ${breakpoint('xs', 'sm')`
    margin-top: 10px;
    margin-bottom: 10px;
  `}
  ${breakpoint('sm')`
    margin-right: 10px;
  `}
`;

const LoginLink = styled(CollapsedNavLink)`
`;

class NavBarUnloggedActions extends Component {
  render() {
    return (
      <div>
        <RegisterLink className="btn btn-outline-primary" to="/teachers/register">Register</RegisterLink>
        <LoginLink className="btn btn-primary" to="/login">Login</LoginLink>
      </div>
    );
  }
}

export default NavBarUnloggedActions;
