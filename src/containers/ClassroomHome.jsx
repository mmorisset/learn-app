import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import * as teachersService from '../services/teachers';
import { ClassroomCard, AddClassroomCard } from '../components/ClassroomIndexCard';
import AddClassroomModal from '../components/AddClassroomModal';

class TeacherHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
      teacher: {
        firstName: ''
      },
      classrooms: [],
      addClassroomModal: {
        show: false
      }
    };

    this.handleAddClassroomClick = this.handleAddClassroomClick.bind(this);
    this.handleClassroomCreate = this.handleClassroomCreate.bind(this);
    this.handleAddClassroomModalClose = this.handleAddClassroomModalClose.bind(this);
  }

  componentDidMount() {
    teachersService.profile().then(teacher => {
      this.setState({
        teacher: teacher,
        classrooms: teacher.classrooms
      });
    })
  }

  handleAddClassroomClick() {
    this.setState({
      addClassroomModal: {
        show: true
      }
    })
  }

  handleAddClassroomModalClose() {
    this.setState({
      addClassroomModal: {
        show: false
      }
    })
  }

  handleClassroomCreate(classroom) {
    this.setState({
      classrooms: [classroom, ...this.state.classrooms],
      addClassroomModal: {
        show: false
      }
    })
  }

  render() {
    const { teacher, classrooms, addClassroomModal} = this.state;

    const classroomElements = classrooms.map((classroom, index) => (
      <Col sm={{ span: 6}} md={{ span: 3}}>
        <ClassroomCard classroom={classroom} ></ClassroomCard>
      </Col>
    ));


    return (
      <div>
        <h2 id="teacher-firstname" className="mb-4">{`Hello ${teacher.firstName} !`}</h2>
        <h4>My Classrooms:</h4>
        <Row>
          <Col sm={{ span: 6}} md={{ span: 3}}>
            <AddClassroomCard handleClick={this.handleAddClassroomClick}/>
          </Col>
          {classroomElements}
        </Row>
        <AddClassroomModal
          show={addClassroomModal.show}
          handleClose={this.handleAddClassroomModalClose}
          handleClassroomCreate={this.handleClassroomCreate}
        />
      </div>
    );
  }
}

export default TeacherHome;

