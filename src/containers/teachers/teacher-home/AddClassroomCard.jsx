import React, { Component } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

const StyledDiv = styled.div`
  border: 1px solid grey;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  background: none!important;
  padding: 0!important;
  font-family: arial, sans-serif;
  color: #069;
  text-decoration: underline;
  cursor: pointer;
  height: 200px;
`;

const StyledFaPlus = styled(FaPlus)`
  font-size: 128px;
  margin-bottom: 10px;
  color: #007bff;
`;

class AddClassroomCard extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <StyledDiv className="text-center action-add-classroom" onClick={handleClick}>
        <StyledFaPlus />
        <p>Add</p>
      </StyledDiv>
    );
  }
}

export default AddClassroomCard;
