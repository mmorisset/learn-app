import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'



const PrivateRoute = (props) => (
  <Fragment>
      { localStorage.getItem('teacher') ? props.children : <Redirect to={{ pathname: 'login', state: { from: props.location } }} /> }
  </Fragment>
)

export default PrivateRoute;
