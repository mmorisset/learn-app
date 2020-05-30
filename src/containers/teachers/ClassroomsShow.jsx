import React, { Component } from 'react';
import { Row, Col, Image, Button, Table, InputGroup, FormControl} from 'react-bootstrap';
import styled from 'styled-components';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { FaRegTrashAlt } from 'react-icons/fa';

import * as classroomsService from 'services/classrooms';
import * as studentsService from 'services/students';

import { ClassroomCard, AddClassroomCard } from 'components/ClassroomIndexCard';
import AddStudentsModal from 'components/AddStudentsModal';
import DeleteStudentConfirmationModal from 'components/DeleteStudentConfirmationModal';


const ClassroomAvatar = styled(Image)`
  height: 80px;
`;

const StudentAvatar = styled(Image)`
  height: 50px;
`;

const CodeFormControl = styled(FormControl)`
  max-width: 85px;
`;

const DeleteStudentButton = styled(Button)`
  margin-top: 5px;
`;

class ClassroomsShow extends Component {

  constructor(props) {
    super(props);

    this.classroomId = this.props.match.params.id;
    this.state = {
      classroom: {
        name: '',
        code: '',
        avatarUrl: ''
      },
      students: [],
      levels: [],
      addStudentsModal: {
        show: false
      },
      classroomCodeCopied: false,
      studentToDeleteId: null,
      studentToDeleteFullName: '',
      deleteStudentConfirmationModal: {
        show: false
      },
    };

    this.handleAddStudentsButtonClick = this.handleAddStudentsButtonClick.bind(this);
    this.handleAddStudentsModalClose = this.handleAddStudentsModalClose.bind(this);
    this.handlestudentsCreate = this.handlestudentsCreate.bind(this);
    this.handleClassroomCodeCopyButtonClick = this.handleClassroomCodeCopyButtonClick.bind(this);
    this.handleDeleteStudentButtonClick = this.handleDeleteStudentButtonClick.bind(this);
    this.handleStudentDelete = this.handleStudentDelete.bind(this);
    this.handleDeleteStudentConfirmationModalClose = this.handleDeleteStudentConfirmationModalClose.bind(this);
  }

  componentDidMount() {
    this.retrieveClassroom();
    this.retrieveStudents();
    this.retrieveLevels();
  }

  retrieveClassroom() {
    classroomsService.get(this.classroomId).then(classroom => {
      this.setState({
        classroom: classroom,
      });
    })
  }

  retrieveStudents() {
    studentsService.index(this.classroomId).then(students => {
      this.setState({
        students: students,
      });
    })
  }

  retrieveLevels() {
    // levelsServices.index().then(levels => {
    //   this.setState({
    //     levels: levels,
    //   });
    // })
  }

  handleAddStudentsModalClose() {
    this.setState({
      addStudentsModal: {
        show: false
      }
    })
  }

  handlestudentsCreate(students) {
    this.retrieveStudents();
    this.handleAddStudentsModalClose();
  }

  handleAddStudentsButtonClick() {
    this.setState({
      addStudentsModal: {
        show: true
      }
    })
  }

  handleDeleteStudentButtonClick(e) {
    this.setState({
      studentToDeleteId: e.currentTarget.getAttribute('data-student-to-delete-id'),
      studentToDeleteFullName: e.currentTarget.getAttribute('data-student-to-delete-fullname'),
      deleteStudentConfirmationModal: {
        show: true
      }
    })
  }

  handleStudentDelete(student) {
    this.retrieveStudents();
    this.handleDeleteStudentConfirmationModalClose();
  }

  handleDeleteStudentConfirmationModalClose() {
    this.setState({
      deleteStudentConfirmationModal: {
        show: false
      }
    })
  }

  handleClassroomCodeCopyButtonClick() {
    this.setState({
      classroomCodeCopied: true
    });
    setTimeout( () =>
      this.setState({
        classroomCodeCopied: false
      }), 2000);
  }

  render() {
    const { classroom, students, addStudentsModal, classroomCodeCopied, studentToDeleteId, studentToDeleteFullName, deleteStudentConfirmationModal} = this.state;

    const studentsElements = students.map((student, index) => (
      <tr>
        <td id={`student-${student.id}`}>
          <StudentAvatar className="d-inline mr-2" src={student.avatarUrl} roundedCircle />
          <p className="d-inline align-middle">{student.fullName}</p>
        </td>
        <td>
          <th>
            toto
          </th>
          <th>
            toto
          </th>
          <th>
            toto
          </th>
          <th>
            toto
          </th>
        </td>
        <td>
          <DeleteStudentButton
            data-student-to-delete-id={student.id}
            data-student-to-delete-fullname={student.fullName}
            className="action-delete-student"
            variant="outline-secondary"
            onClick={this.handleDeleteStudentButtonClick}>
            <FaRegTrashAlt />
          </DeleteStudentButton>
        </td>
      </tr>
    ));

    const classroomCodeCopyButton = classroomCodeCopied ?
      <Button className="action-copy-classroom-code" variant="success">Copied!</Button> :
      <Button className="action-copy-classroom-code" variant="outline-secondary">Copy</Button>

    return (
      <div>
        <ClassroomAvatar className="d-inline mr-2" src={classroom.avatarUrl} roundedCircle />
        <h2 id="classroom-name" className="d-inline align-middle mr-3">{`${classroom.name}`}</h2>
        <Button className="action-add-students d-inline" variant="outline-primary" onClick={this.handleAddStudentsButtonClick}>
          Add students
        </Button>

        <div className="float-right">
          <label>Classroom code: </label>
          <InputGroup className="mb-3">
            <CodeFormControl id="classroom-code-input" disabled value={classroom.code}/>
            <InputGroup.Append>
            <CopyToClipboard onCopy={this.handleClassroomCodeCopyButtonClick} text={classroom.code}>
              {classroomCodeCopyButton}
            </CopyToClipboard>
            </InputGroup.Append>
          </InputGroup>
        </div>



        <Table className="mt-5" striped bordered hover>
          <thead>
            <tr>
              <th>Students</th>
              <th>Exercises</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentsElements}
          </tbody>
        </Table>

        <div className="d-flex justify-content-center mt-3">
          <Button className="action-add-students" variant="outline-primary" onClick={this.handleAddStudentsButtonClick}>
            Add students
          </Button>
        </div>

        <AddStudentsModal
          show={addStudentsModal.show}
          handleClose={this.handleAddStudentsModalClose}
          handleStudentsCreate={this.handlestudentsCreate}
          classroomId={this.classroomId}
        />

        <DeleteStudentConfirmationModal
          show={deleteStudentConfirmationModal.show}
          handleClose={this.handleDeleteStudentConfirmationModalClose}
          studentToDeleteId={studentToDeleteId}
          studentToDeleteFullName={studentToDeleteFullName}
          handleStudentDelete={this.handleStudentDelete}
          classroomId={this.classroomId}
        />
      </div>
    );
  }
}

export default ClassroomsShow;

