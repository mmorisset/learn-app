import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'src/containers/Home';
import Login from 'src/containers/login/Login';
import TeacherLogin from 'src/containers/teachers/TeacherLogin';
import TeacherHome from 'src/containers/teachers/teacher-home/TeacherHome';
import ClassroomShow from 'src/containers/teachers/classroom-show/ClassroomShow';
import ClassroomLogin from 'src/containers/students/ClassroomLogin';
import ClassroomStudentIndex from 'src/containers/students/ClassroomStudentIndex';
import PrivateRoute from 'src/routes/PrivateRoute';

class Routes extends Component {
  render() {
    const {
      loggedTeacher,
      handleLoggedTeacherChange,
      handleLoggedClassroomChange,
      handleLoggedStudentChange,
    } = this.props;
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route
          path="/teachers/login"
          render={(props) => (
            <TeacherLogin
              {...props}
              handleLoggedTeacherChange={handleLoggedTeacherChange}
            />
          )}
        />
        <Route
          exact
          path="/classrooms/login"
          render={(props) => (
            <ClassroomLogin
              {...props}
              handleLoggedClassroomChange={handleLoggedClassroomChange}
            />
          )}
        />
        <PrivateRoute loggedRessource="classroom" unauthorizedRedirectPath="classrooms/login">
          <Route
            path="/classrooms/:id/students"
            render={(props) => (
              <ClassroomStudentIndex
                {...props}
                handleLoggedStudentChange={handleLoggedStudentChange}
              />
            )}
          />
        </PrivateRoute>
        <PrivateRoute loggedRessource="teacher" unauthorizedRedirectPath="teachers/login">
          <Route
            path="/teachers/home"
            render={(props) => (
              <TeacherHome
                {...props}
                loggedTeacher={loggedTeacher}
              />
            )}
          />
          <Route
            exact
            path="/classrooms/:id"
            render={(props) => (
              <ClassroomShow
                {...props}
                loggedTeacher={loggedTeacher}
              />
            )}
          />
        </PrivateRoute>
      </Switch>
    );
  }
}

export default Routes;
