import React, { Component } from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { FaPlus } from 'react-icons/fa';

const StyledDiv = styled.div`
  border: 1px solid grey;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
`;

const StyledImage = styled(Image)`
  margin-bottom: 10px;
`

const StyledFaPlus = styled(FaPlus)`
  font-size: 128px;
  margin-bottom: 10px;
`

class ClassroomCard extends Component {
  render() {
    return (
      <Link id={`classroom-${this.props.classroom.id}`} className="action-show-classroom" to={`/classrooms/${this.props.classroom.id}`}>
        <StyledDiv className="text-center">
          <StyledImage src={this.props.classroom.avatarUrl} roundedCircle />
          <p>{this.props.classroom.name}</p>
        </StyledDiv>
      </Link>
    );
  }
}

class AddClassroomCard extends Component {
  render() {
    return (
      <Link className="action-add-classroom" onClick={this.props.handleClick}>
        <StyledDiv className="text-center">
          <StyledFaPlus/>
          <p>Add</p>
        </StyledDiv>
      </Link>
    );
  }
}

export {
  ClassroomCard,
  AddClassroomCard
}
