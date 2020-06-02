import React, { Component } from 'react';
import {
  Image,
  Button,
  Table,
  InputGroup,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaRegTrashAlt } from 'react-icons/fa';

import * as classroomsService from 'services/classrooms';
import * as studentsService from 'services/students';
import * as levelsService from 'services/levels';

import AddStudentsModal from './AddStudentsModal';
import DeleteStudentConfirmationModal from './DeleteStudentConfirmationModal';


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

const StyledTable = styled(Table)`
  table-layout: auto;
  border-collapse: collapse;
  width: 100%;
  &&& {
    thead th {
      background-color: #007bff;
      color: white;
      font-weight: 500;
    }
    tbody td {
      padding: 2px;
    }
    tbody th {
      height: 50px;
      &.not-tackled-yet {
        background-color: #d4d4d4;
      }
      &.needs-help {
        background-color: #ef4545;
      }
      &.still-learning {
        background-color: #efb345;
      }
      &.doing-great{
        background-color: #45ef5a;
      }
    }
    .absorbing-column {
      width: 50%;
    }
`;

class ClassroomShow extends Component {
  constructor(props) {
    super(props);
    const { match: { params: { id } } } = this.props;
    this.classroomId = id;
    this.state = {
      classroom: {
        name: '',
        code: '',
        avatarUrl: '',
      },
      students: [],
      levels: [],
      addStudentsModal: {
        show: false,
      },
      classroomCodeCopied: false,
      studentToDeleteId: null,
      studentToDeleteFullName: '',
      deleteStudentConfirmationModal: {
        show: false,
      },
    };

    this.handleAddStudentsButtonClick = this.handleAddStudentsButtonClick.bind(this);
    this.handleAddStudentsModalClose = this.handleAddStudentsModalClose.bind(this);
    this.handlestudentsCreate = this.handlestudentsCreate.bind(this);
    this.handleClassroomCodeCopyButtonClick = this.handleClassroomCodeCopyButtonClick.bind(this);
    this.handleDeleteStudentButtonClick = this.handleDeleteStudentButtonClick.bind(this);
    this.handleStudentDelete = this.handleStudentDelete.bind(this);
    this.handleDeleteStudentConfirmationModalClose = this.handleDeleteStudentConfirmationModalClose
      .bind(this);
  }

  componentDidMount() {
    this.retrieveClassroom();
    this.retrieveStudents();
    this.retrieveLevels();
  }

  retrieveClassroom() {
    classroomsService.get(this.classroomId).then((classroom) => {
      this.setState({
        classroom,
      });
    });
  }

  retrieveStudents() {
    studentsService.index(this.classroomId).then((students) => {
      this.setState({
        students,
      });
    });
  }

  retrieveLevels() {
    levelsService.index().then((levels) => {
      this.setState({
        levels,
      });
    });
  }

  handleAddStudentsModalClose() {
    this.setState({
      addStudentsModal: {
        show: false,
      },
    });
  }

  handlestudentsCreate() {
    this.retrieveStudents();
    this.handleAddStudentsModalClose();
  }

  handleAddStudentsButtonClick() {
    this.setState({
      addStudentsModal: {
        show: true,
      },
    });
  }

  handleDeleteStudentButtonClick(e) {
    this.setState({
      studentToDeleteId: e.currentTarget.getAttribute('data-student-to-delete-id'),
      studentToDeleteFullName: e.currentTarget.getAttribute('data-student-to-delete-fullname'),
      deleteStudentConfirmationModal: {
        show: true,
      },
    });
  }

  handleStudentDelete() {
    this.retrieveStudents();
    this.handleDeleteStudentConfirmationModalClose();
  }

  handleDeleteStudentConfirmationModalClose() {
    this.setState({
      deleteStudentConfirmationModal: {
        show: false,
      },
    });
  }

  handleClassroomCodeCopyButtonClick() {
    this.setState({
      classroomCodeCopied: true,
    });
    setTimeout(() => {
      this.setState({
        classroomCodeCopied: false,
      });
    }, 2000);
  }

  render() {
    const {
      classroom,
      students,
      levels,
      addStudentsModal,
      classroomCodeCopied,
      studentToDeleteId,
      studentToDeleteFullName,
      deleteStudentConfirmationModal,
    } = this.state;

    const studentsElements = students.map((student) => {
      const studentGrades = levels.map((level) => {
        const levelStudentGrades = level.exercises.map((exercise) => {
          let className = 'not-tackled-yet';
          const exerciseGrades = student
            .exerciseGrades
            .filter((exerciseGrade) => exerciseGrade.exerciseId === exercise.id);

          if (exerciseGrades.length !== 0) {
            const { grade } = exerciseGrades[0];
            if (grade <= 4) {
              className = 'needs-help';
            } else if (grade <= 7) {
              className = 'still-learning';
            } else {
              className = 'doing-great';
            }
          }
          return (
            <OverlayTrigger
              placement="right"
              /* eslint-disable-next-line no-undef */
              onEnter={() => { responsiveVoice.speak(exercise.word); }}
              overlay={(
                <Tooltip id={`exercise-${exercise.id}-tooltip`}>
                  {exercise.word}
                </Tooltip>
              )}
            >
              <th className={className} aria-label={className} />
            </OverlayTrigger>
          );
        });
        return (
          <td>
            {levelStudentGrades}
          </td>
        );
      });
      return (
        <tr>
          <td id={`student-${student.id}`}>
            <StudentAvatar className="d-inline mr-2" src={student.avatarUrl} roundedCircle />
            <p className="d-inline align-middle">{student.fullName}</p>
          </td>
          {studentGrades}
          <td>
            <DeleteStudentButton
              data-student-to-delete-id={student.id}
              data-student-to-delete-fullname={student.fullName}
              className="action-delete-student"
              variant="outline-secondary"
              onClick={this.handleDeleteStudentButtonClick}
            >
              <FaRegTrashAlt />
            </DeleteStudentButton>
          </td>
        </tr>
      );
    });

    const levelsElements = levels.map((level) => (
      <th>{level.name}</th>
    ));

    const classroomCodeCopyButton = classroomCodeCopied
      ? <Button className="action-copy-classroom-code" variant="success">Copied!</Button>
      : <Button className="action-copy-classroom-code" variant="outline-secondary">Copy</Button>;

    return (
      <div>
        <ClassroomAvatar className="d-inline mr-2" src={classroom.avatarUrl} roundedCircle />
        <h2 id="classroom-name" className="d-inline align-middle mr-3">{`${classroom.name}`}</h2>
        <Button className="action-add-students d-inline" variant="outline-primary" onClick={this.handleAddStudentsButtonClick}>
          Add students
        </Button>

        <div className="float-right">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>Classroom code: </label>
          <InputGroup className="mb-3">
            <CodeFormControl id="classroom-code-input" disabled value={classroom.code} />
            <InputGroup.Append>
              <CopyToClipboard
                onCopy={this.handleClassroomCodeCopyButtonClick}
                text={classroom.code}
              >
                {classroomCodeCopyButton}
              </CopyToClipboard>
            </InputGroup.Append>
          </InputGroup>
        </div>

        <StyledTable id="students-table" className="table-responsive-md mt-5">
          <thead>
            <tr>
              <th className="absorbing-column">Students</th>
              {levelsElements}
              <th className="absorbing-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentsElements}
          </tbody>
        </StyledTable>

        <div className="d-flex justify-content-center mt-3">
          <Button
            className="action-add-students"
            variant="outline-primary"
            onClick={this.handleAddStudentsButtonClick}
          >
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

export default ClassroomShow;
