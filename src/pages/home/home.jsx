import React from 'react';
import styled from 'styled-components';
import { Rules } from '../../components';

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.StrongGray};
  background-size: cover;
  overflow: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const Home = () => {
  return (
    <Container>
      <Rules />
    </Container>
  );
};

export default Home;
