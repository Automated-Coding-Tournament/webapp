import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 80%;
  padding: 20px;
`;

const DataTableContainer = (props) => {
  return <Container>{props.children}</Container>;
};

export default DataTableContainer;
