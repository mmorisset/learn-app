import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`
  border: 1px solid grey;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
`;

const StyledImage = styled(Image)`
  margin-bottom: 10px;
`;

class ClassroomCard extends Component {
  render() {
    const { classroom } = this.props;
    const { id, name, avatarUrl } = classroom;
    return (
      <Link id={`classroom-${id}`} className="action-show-classroom" to={`/classrooms/${id}`}>
        <StyledDiv className="text-center">
          <StyledImage src={avatarUrl} roundedCircle />
          <p>{name}</p>
        </StyledDiv>
      </Link>
    );
  }
}

export default ClassroomCard;
