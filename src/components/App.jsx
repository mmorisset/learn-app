import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';

import Routes from 'src/routes/Routes';
import NavigationBar from 'src/components/navigation-bar/NavigationBar';

const StyledContainer = styled(Container)`
  padding-top: 40px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLoggedTeacherChange = this.handleLoggedTeacherChange.bind(this);
    this.handleTokenChange = this.handleTokenChange.bind(this);
    const loggedTeacherInfo = JSON.parse(localStorage.getItem('teacher'));
    if (loggedTeacherInfo) {
      this.state = {
        loggedTeacher: loggedTeacherInfo.teacher,
        token: loggedTeacherInfo.token
      };
    } else {
      this.state = {
        loggedTeacher: undefined,
        token: ''
      };
    }
  }


  handleLoggedTeacherChange(loggedTeacher) {
    this.setState({ loggedTeacher: loggedTeacher });
  }

  handleTokenChange(token) {
    this.setState({ token: token });
  }

  render() {
    const loggedTeacher = this.state.loggedTeacher;
    return (
      <div>
        <NavigationBar
          onLoggedTeacherChange={ this.handleLoggedTeacherChange }
          onTokenChange={ this.handleTokenChange }
          loggedTeacher={ loggedTeacher }
        />
        <StyledContainer className="fluid">
          <Routes
            onLoggedTeacherChange={ this.handleLoggedTeacherChange }
            onTokenChange={ this.handleTokenChange }
            loggedTeacher={ loggedTeacher }
            />
        </StyledContainer>
      </div>
    );
  }
}

export default App;
