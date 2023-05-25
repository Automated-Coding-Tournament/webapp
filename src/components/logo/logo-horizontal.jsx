import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo/logo-horizontal.png';

const Container = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const Image = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const LogoHorizontal = (props) => {
  return (
    <Container {...props}>
      <Image
        {...props}
        src={logo}
      />
    </Container>
  );
};

export default LogoHorizontal;
