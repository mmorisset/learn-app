import React, { Component } from 'react';
import {
  Modal,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';

import * as classroomsService from 'services/classrooms';


class AddClassroomModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classroomName: '',
      validated: false,
      error: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClassroomNameChange = this.handleClassroomNameChange.bind(this);
  }

  handleSubmit(e) {
    const form = e.currentTarget;
    const { handleClassroomCreate } = this.props;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    e.preventDefault();

    this.setState({
      validated: true,
    });
    const { name } = this.state;

    classroomsService.add(name)
      .then(
        (classroom) => {
          handleClassroomCreate(classroom);
          this.setState({
            name: '',
          });
        },
        (error) => {
          this.setState({
            error,
          });
        },
      );
  }

  handleClassroomNameChange(e) {
    const { value } = e.target;
    this.setState({
      classroomName: value,
    });
  }

  render() {
    const {
      classroomName,
      validated,
      error,
    } = this.state;
    const { show, handleClose } = this.props;

    let alert;
    if (error) {
      alert = <Alert id="form-error-alert" variant="danger">{error}</Alert>;
    }

    return (
      <Modal id="add-classroom-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert}
          <Form id="add-classroom-form" noValidate validated={validated} onSubmit={this.handleSubmit}>
            <Form.Group id="classroom-name" controlId="classroom-name-input">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                required
                type="name"
                placeholder="Enter classroom name"
                name="name"
                value={classroomName}
                onChange={this.handleClassroomNameChange}
              />
              <Form.Control.Feedback type="invalid">Please enter a classroom name.</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="action-cancel" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button form="add-classroom-form" className="action-add-classroom" variant="primary" type="submit">
            Add classroom
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddClassroomModal;
