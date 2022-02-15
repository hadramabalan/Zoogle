import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`

const StyledLoader = styled.div`
  width: 120px;
  height: 120px;

  ::after {
    content: ' ';
    display: block;
    width: 80px;
    height: 80px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #ffb400;
    border-color: #ffb400 transparent #ffb400 transparent;
    animation: ring 1.2s linear infinite;
  }

  @keyframes ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Loader = () => (
  <Container>
    <StyledLoader />
  </Container>
)

export default Loader
