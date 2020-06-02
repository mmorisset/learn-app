import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'src/containers/Home';
import Login from 'src/containers/login/Login';
import TeachersLogin from 'src/containers/teachers/TeacherLogin';
import TeachersHome from 'src/containers/teachers/teacher-home/TeacherHome';
import ClassroomsShow from 'src/containers/teachers/classroom-show/ClassroomShow';
import ClassroomsLogin from 'src/containers/students/ClassroomLogin';
import PrivateRoute from 'src/routes/PrivateRoute';

class Routes extends Component {
  render() {
    const { loggedTeacher, handleLoggedTeacherChange, handleLoggedStudentChange } = this.props;
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route
          path="/teachers/login"
          render={(props) => (
            <TeachersLogin
              {...props}
              handleLoggedTeacherChange={handleLoggedTeacherChange}
            />
          )}
        />
        <Route
          path="/classrooms/login"
          render={(props) => (
            <ClassroomsLogin
              {...props}
              handleLoggedStudentChange={handleLoggedStudentChange}
            />
          )}
        />
        <PrivateRoute>
          <Route
            path="/teachers/home"
            render={(props) => (
              <TeachersHome
                {...props}
                loggedTeacher={loggedTeacher}
              />
            )}
          />
          <Route
            path="/classrooms/:id"
            render={(props) => (
              <ClassroomsShow
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
