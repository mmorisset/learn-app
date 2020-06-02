import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
  render() {
    const {
      children,
      location,
      loggedRessource,
      unauthorizedRedirectPath,
    } = this.props;

    return (
      <>
        {
          localStorage.getItem(loggedRessource)
            ? children
            : (
              <Redirect
                to={{ pathname: unauthorizedRedirectPath, state: { from: location } }}
              />
            )
        }
      </>
    );
  }
}

export default PrivateRoute;
