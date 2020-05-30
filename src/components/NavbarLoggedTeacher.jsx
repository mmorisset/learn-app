import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Image, Popover, OverlayTrigger, Button } from 'react-bootstrap';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

import * as teachersService from 'services/teachers'

const NavBarImage = styled(Image)`
  width: 40px;
`;

const PopoverImage = styled(Image)`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 60px;
`;

const Fullname = styled.h1`
  font-weight: bolder;
  font-size: 20px;
`;

const Email = styled.h2`
  font-weight: light;
  font-size: 16px;
`;

class NavBarloggedTeacher extends Component {
  constructor(props) {
    super(props);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { showPopover: true };
  }

  handleLogoutClick(e) {
    e.preventDefault();

    teachersService.logout()

    this.props.onLoggedTeacherChange(undefined);
    this.props.onTokenChange('');
  }

  render() {
    const loggedTeacher = this.props.loggedTeacher;
    const fullname = loggedTeacher.firstName + ' ' + loggedTeacher.lastName;
    const avatarUrl = loggedTeacher.avatarUrl;
    const popover = (
      <Popover className="text-center" id="popover-basic">
        <Popover.Content>
          <PopoverImage src={avatarUrl} roundedCircle />
          <Fullname>{fullname}</Fullname>
          <Email>{loggedTeacher.email}</Email>
          <Button onClick={ this.handleLogoutClick }>Logout</Button>
        </Popover.Content>
      </Popover>
    )

    return (
      <OverlayTrigger trigger="click" show={ this.state.showPopover } placement="bottom" overlay={popover}>
        <NavBarImage src={avatarUrl} roundedCircle />
      </OverlayTrigger>
    );
  }
}

export default NavBarloggedTeacher;
