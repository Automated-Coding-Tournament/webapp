import React from 'react';
import styled from 'styled-components';
import { Logo } from '../../components';

const Container = styled.div`
  height: calc(100% - ${(props) => props.topBar?.offsetHeight || 0}px);
  background-color: ${(props) => props.theme.colors.StrongGray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const topBar = document.getElementById('topBar');
  return (
    <Container topBar={topBar}>
      <Logo
        height='588px'
        width='873px'
      />
    </Container>
  );
};

export default Home;
