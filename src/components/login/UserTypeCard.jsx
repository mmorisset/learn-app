import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

const StyledCard = styled(Card)`
  ${breakpoint('xs', 'sm')`
    margin-bottom: 20px;
  `}
`;

class UserTypeCard extends Component {
  render() {
    return (
      <StyledCard>
        <Card.Img variant="top" src="http://fakeimg.us-east-1.elasticbeanstalk.com/100x100" />
        <Card.Body className="text-center">
          <Link id={this.props.linkId} className="btn btn-outline-primary" to={this.props.linkTo}>{this.props.linkLabel}</Link>
        </Card.Body>
      </StyledCard>
    );
  }
}

export default UserTypeCard;
