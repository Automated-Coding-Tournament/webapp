import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo/logo.png';

const Container = styled.div`
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
`;

const Image = styled.img`
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
`;

const Logo = (props) => {
  return (
    <Container {...props}>
      <Image
        {...props}
        src={logo}
      />
    </Container>
  );
};

export default Logo;
