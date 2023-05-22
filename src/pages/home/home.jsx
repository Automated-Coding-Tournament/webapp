import React from 'react';
import styled from 'styled-components';
import { Logo } from '../../components';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.StrongGray};
  background-size: cover;
  overflow: auto;
  height: 92.7%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  return (
    <Container>
      <Logo
        height='588px'
        width='873px'
      />
    </Container>
  );
};

export default Home;
