import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
  render() {
    const { children, location } = this.props;

    return (
      <>
        {
          localStorage.getItem('teacher')
            ? children
            : (
              <Redirect
                to={{ pathname: 'login', state: { from: location } }}
              />
            )
        }
      </>
    );
  }
}

export default PrivateRoute;
