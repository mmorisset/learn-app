import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import UserTypeCard from 'components/UserTypeCard';

class Login extends Component {

  render() {
    return (
      <Row>
        <Col sm={{ span: 4, offset: 2 }}>
          <UserTypeCard linkTo="/teachers/login" linkId="teacher-login" linkLabel="I am a Teacher"/>
        </Col>
        <Col sm={4}>
          <UserTypeCard linkTo="/classrooms/login" linkId="student-login" linkLabel="I am a Student"/>
        </Col>
      </Row>
    );
  }
}

export default Login;
