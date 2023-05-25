import React from 'react';
import styled from 'styled-components';
import { Rules } from '../../components';
import background from '../../assets/backgrounds/background.png';

const Container = styled.div`
  background-image: url(${background});
  background-color: ${(props) => props.theme.colors.StrongGray};
  background-size: cover;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
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
