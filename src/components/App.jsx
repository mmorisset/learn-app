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

    const loggedTeacherInfo = JSON.parse(localStorage.getItem('teacher'));
    if (loggedTeacherInfo) {
      const { teacher } = loggedTeacherInfo;
      this.state = {
        loggedTeacher: teacher,
      };
    } else {
      this.state = {
        loggedTeacher: undefined,
      };
    }

    this.handleLoggedTeacherChange = this.handleLoggedTeacherChange.bind(this);
  }


  handleLoggedTeacherChange(loggedTeacher) {
    this.setState({ loggedTeacher });
  }

  render() {
    const { loggedTeacher } = this.state;
    return (
      <div>
        <NavigationBar
          handleLoggedTeacherChange={this.handleLoggedTeacherChange}
          loggedTeacher={loggedTeacher}
        />
        <StyledContainer className="fluid">
          <Routes
            handleLoggedTeacherChange={this.handleLoggedTeacherChange}
            loggedTeacher={loggedTeacher}
          />
        </StyledContainer>
      </div>
    );
  }
}

export default App;
