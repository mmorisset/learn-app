import React, { Component } from 'react';
import { Row, Col, Form, Button, Alert } from 'react-bootstrap';
import * as teachersService from 'services/teachers'

class TeachersLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
        email: '',
        password: '',
        validated: false,
        submitted: false,
        loading: false,
        error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    e.preventDefault();

    this.setState({ validated: true });
    this.setState({ submitted: true });
    const { email, password } = this.state;
    this.setState({ loading: true });

    teachersService.login(email, password)
      .then(
        teacher => {
          this.props.onLoggedTeacherChange(teacher.teacher);
          this.props.onTokenChange(teacher.token);
          const { from } = this.props.location.state || { from: { pathname: "/teachers/home" } };
          this.props.history.push(from);
        },
        error => {
          this.setState({ error: error, loading: false })
        }
      );
  }

  render() {
    let alert;
    const { email, password, validated, submitted, loading, error } = this.state;

    if (error) {
      alert = <Alert id="form-error-alert" variant="danger">{error}</Alert>
    }

    return (
      <Row>
        <Col md={ { span: 6, offset: 3}}>
          <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
            <h3 className="text-center">Login</h3>

            {alert}

            <Form.Group id="email" controlId="email-input">
                <Form.Label>Email address</Form.Label>
                <Form.Control required type="email" placeholder="Enter email" name="email" value={email} onChange={this.handleChange}/>
                <Form.Control.Feedback type="invalid">Please enter an email.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group id="password" controlId="password-input">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Enter Password" name="password" value={password} onChange={this.handleChange}/>
              <Form.Control.Feedback type="invalid">Please enter your password.</Form.Control.Feedback>
            </Form.Group>

            <div className="text-center">
              <Button id="login-button" variant="primary" type="submit">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default TeachersLogin;
