import React, { Component } from 'react';
import {
  Modal,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

import * as studentsService from 'services/students';

class AddStudentsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validated: false,
      error: '',
      studentsNames: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStudentsNamesChange = this.handleStudentsNamesChange.bind(this);
  }

  handleStudentsNamesChange(studentsNames) {
    this.setState({
      studentsNames,
    });
  }

  handleSubmit(e) {
    const { classroomId, handleStudentsCreate } = this.props;
    const { studentsNames } = this.state;
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    e.preventDefault();

    this.setState({
      validated: true,
    });

    studentsService.add(classroomId, studentsNames)
      .then(
        (students) => {
          handleStudentsCreate(students);
          this.setState({
            studentsNames: [],
          });
        },
        (error) => {
          this.setState({
            error,
          });
        },
      );
  }

  render() {
    const { studentsNames, validated, error } = this.state;
    const { show, handleClose } = this.props;
    const TagsInputProps = { id: 'students-names-input', placeholder: 'Add a name' };

    let alert;
    if (error) {
      alert = <Alert id="form-error-alert" variant="danger">{error}</Alert>;
    }

    return (
      <Modal id="add-students-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add students</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert}
          <Form id="add-students-form" noValidate validated={validated} onSubmit={this.handleSubmit}>
            <Form.Group id="students-names" controlId="students-names-input">
              <Form.Label>Students Names:</Form.Label>
              <TagsInput
                inputProps={TagsInputProps}
                value={studentsNames}
                onChange={this.handleStudentsNamesChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="action-cancel" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button form="add-students-form" className="action-add-students" variant="primary" type="submit">
            Add students
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddStudentsModal;
