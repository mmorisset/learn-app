import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  Alert,
} from 'react-bootstrap';

import ReactCodeInput from 'react-code-input';

import styled from 'styled-components';

import * as classroomsService from 'services/classrooms';
import InstructionsButton from 'src/components/InstructionsButton';

const StyledRow = styled(Row)`
  margin-top: 200px;
`;

class ClassroomLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      instructions: 'Welcome, to login, please enter your class code',
      code: '',
      validated: false,
      error: '',
    };

    this.handleCodeChange = this.handleCodeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCodeChange(code) {
    this.setState({ code });
    if (code.length === 6) {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    const {
      location: { state },
      history,
    } = this.props;

    const { code } = this.state;

    classroomsService.login(code)
      .then(
        (json) => {
          const { classroom: { id } } = json;
          const { from } = state || { from: { pathname: `/classrooms/${id}/students` } };
          history.push(from);
        },
        (error) => {
          this.setState({ error });
        },
      );
  }

  render() {
    const {
      code,
      validated,
      error,
      instructions,
    } = this.state;

    let alert;

    if (error) {
      alert = <Alert id="form-error-alert" variant="danger">{error}</Alert>;
    }

    return (
      <>
        <InstructionsButton className="float-right" instructions={instructions} />
        <StyledRow>
          <Col className="text-center" md={{ span: 6, offset: 3 }}>
            <Form id="classroom-login-form" noValidate validated={validated} onSubmit={this.handleSubmit}>

              {alert}

              <Form.Group id="code" controlId="code-input">
                <Form.Label>To login, please enter your class code:</Form.Label>
                <ReactCodeInput type="password" value={code} fields={6} onChange={this.handleCodeChange} />
              </Form.Group>
            </Form>
          </Col>
        </StyledRow>
      </>
    );
  }
}

export default ClassroomLogin;
