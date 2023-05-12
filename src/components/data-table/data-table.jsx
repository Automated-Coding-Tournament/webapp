import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 8px;
  background: ${(props) => `${props.theme.colors.Black}E5`};
  border: 3px solid ${(props) => props.theme.colors.BlazeBlue};
  border-radius: 10px;
  width: 100%;
`;

const Table = styled.table`
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || 'auto'};
  padding: ${(props) => props.padding || '8px'};
  border-spacing: 0px;
  border-collapse: collapse;
  width: 100%;
`;

const Text = styled.p`
  color: ${(props) => props.theme.colors.White};
`;

const DataTable = (props) => {
  const {
    width,
    height,
    margin,
    padding,
    loading = false,
    noDataVisible = false
  } = { ...props };
  return (
    <Container>
      <Table
        width={width}
        height={height}
        margin={margin}
        padding={padding}
      >
        {props.children}
      </Table>
      {loading && <Text>Loading...</Text>}
      {!loading && noDataVisible && <Text>No data</Text>}
    </Container>
  );
};

export default DataTable;
