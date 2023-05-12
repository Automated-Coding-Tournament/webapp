import React from 'react';
import styled from 'styled-components';

const TableHeader = styled.thead`
  box-shadow: 0 2px 16px ${(props) => props.theme.colors.BlazeBlue};
  transform: translateY(-5px);
  font-weight: bold;
`;

const DataTableHeader = (props) => {
  return <TableHeader>{props.children}</TableHeader>;
};

export default DataTableHeader;
