import React, { Component } from 'react';
import {
  Modal,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';

import * as studentsService from 'services/students';

class DeleteStudentConfirmationModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentName: '',
      isValid: false,
      isInvalid: false,
      error: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStudentNameChange = this.handleStudentNameChange.bind(this);
  }

  handleSubmit(e) {
    const { studentName } = this.state;
    const {
      studentToDeleteFullName,
      classroomId,
      studentToDeleteId,
      handleStudentDelete,
    } = this.props;

    if (studentName !== studentToDeleteFullName) {
      e.stopPropagation();
      this.setState({
        isValid: false,
        isInvalid: true,
      });
    } else {
      this.setState({
        isValid: true,
        isInvalid: false,
      });
    }

    e.preventDefault();

    studentsService.destroy(classroomId, studentToDeleteId)
      .then(
        (student) => {
          handleStudentDelete(student);
          this.setState({
            studentName: '',
          });
        },
        (error) => {
          this.setState({
            error,
          });
        },
      );
  }

  handleStudentNameChange(e) {
    const { value } = e.target;
    this.setState({
      studentName: value,
    });
  }

  render() {
    const {
      studentName,
      error,
      isValid,
      isInvalid,
    } = this.state;
    const { show, handleClose, studentToDeleteFullName } = this.props;

    let alert;

    if (error) {
      alert = <Alert id="form-error-alert" variant="danger">{error}</Alert>;
    }

    return (
      <Modal id="delete-student-confirmation-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert}
          <p>
            Are you sure, you want to delete the student
            <strong>
              {studentToDeleteFullName}
            </strong>
            , please confirm it by typing its fullname:
          </p>
          <Form id="delete-student-form" onSubmit={this.handleSubmit}>
            <Form.Group id="student-name" controlId="student-name-input">
              <Form.Control
                isInvalid={isInvalid}
                isValid={isValid}
                type="name"
                placeholder="Enter the student fullname"
                name="name"
                value={studentName}
                onChange={this.handleStudentNameChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter the student fullname for confirmation.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="action-cancel" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button form="delete-student-form" className="action-delete-student" variant="primary" type="submit">
            Delete student
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeleteStudentConfirmationModal;
