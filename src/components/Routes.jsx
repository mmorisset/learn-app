import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from 'src/containers/Home';
import Login from 'src/containers/Login';
import TeachersLogin from 'src/containers/teachers/TeachersLogin';
import TeachersHome from 'src/containers/teachers/TeachersHome';
import ClassroomsShow from 'src/containers/teachers/ClassroomsShow';
import ClassroomsLogin from 'src/containers/students/ClassroomsLogin';


import PrivateRoute from './PrivateRoute';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/teachers/login"
          render={(props) => <TeachersLogin {...props}
          onLoggedTeacherChange = { this.props.onLoggedTeacherChange }
          onTokenChange = { this.props.onTokenChange } />}
        />
        <Route path="/classrooms/login"
          render={(props) => <ClassroomsLogin {...props}
          onLoggedStudentChange = { this.props.onLoggedStudentChange }
          onTokenChange = { this.props.onTokenChange } />}
        />
        <PrivateRoute>
          <Route path="/teachers/home"
            render={(props) => <TeachersHome {...props}
            loggedTeacher={ this.props.loggedTeacher } />}
          />
          <Route path="/classrooms/:id"
            render={(props) => <ClassroomsShow {...props}
            loggedTeacher={ this.props.loggedTeacher } />}
          />
        />
        </PrivateRoute>
      </Switch>
    );
  }
}

export default Routes;
