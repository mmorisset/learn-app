import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';

import Routes from 'src/routes/Routes';
import NavigationBar from 'src/containers/layout/navigation-bar/NavigationBar';

const StyledContainer = styled(Container)`
  padding-top: 40px;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedTeacher: undefined,
      loggedStudent: undefined,
    };

    const loggedTeacherInfo = JSON.parse(localStorage.getItem('teacher'));
    if (loggedTeacherInfo) {
      const { teacher } = loggedTeacherInfo;
      this.state = {
        loggedTeacher: teacher,
      };
    }

    const loggedStudentInfo = JSON.parse(localStorage.getItem('student'));
    if (loggedStudentInfo) {
      const { student } = loggedStudentInfo;
      this.state = {
        loggedStudent: student,
      };
    }

    this.handleLoggedTeacherChange = this.handleLoggedTeacherChange.bind(this);
    this.handleLoggedStudentChange = this.handleLoggedStudentChange.bind(this);
  }


  handleLoggedTeacherChange(loggedTeacher) {
    this.setState({ loggedTeacher });
  }

  handleLoggedStudentChange(loggedStudent) {
    this.setState({ loggedStudent });
  }

  render() {
    const { loggedTeacher, loggedStudent } = this.state;
    return (
      <div>
        <NavigationBar
          handleLoggedTeacherChange={this.handleLoggedTeacherChange}
          loggedTeacher={loggedTeacher}
          loggedStudent={loggedStudent}
        />
        <StyledContainer className="fluid">
          <Routes
            handleLoggedTeacherChange={this.handleLoggedTeacherChange}
            loggedTeacher={loggedTeacher}
            handleLoggedStudentChange={this.handleLoggedStudentChange}
            loggedStudent={loggedStudent}
          />
        </StyledContainer>
      </div>
    );
  }
}

export default App;
