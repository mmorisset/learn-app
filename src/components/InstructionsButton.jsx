import React, { Component } from 'react';
import {
  Button,
} from 'react-bootstrap';

import { FaBullhorn } from 'react-icons/fa';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  width: 80px;
  height: 80px;
  border-radius: 73px;
  font-size: 40px;
  line-height: 40px;
`;

class InstructionsButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
  }

  componentDidMount() {
    this.playInstructions();
  }

  handleStart() {
    this.setState({ isPlaying: true });
  }

  handleEnd() {
    this.setState({ isPlaying: false });
  }

  handleClick() {
    this.playInstructions();
  }

  playInstructions() {
    const { isPlaying } = this.state;
    const { instructions } = this.props;
    if (isPlaying) {
      return;
    }

    /* eslint-disable-next-line no-undef */
    responsiveVoice.speak(instructions, 'US English Male', { onstart: this.handleStart, onend: this.handleEnd });
  }

  render() {
    const { className } = this.props;
    return (
      <StyledButton className={className} onClick={this.handleClick}>
        <FaBullhorn />
      </StyledButton>
    );
  }
}

export default InstructionsButton;
