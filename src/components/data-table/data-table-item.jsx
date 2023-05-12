import React from 'react';
import styled from 'styled-components';

const TableItem = styled.td`
  width: ${(props) => props.width || 'auto'};
  color: ${(props) => props.color || props.theme.colors.White};
  padding: 8px;
  text-align: ${(props) => props.align || 'left'};
`;

const DataTableItem = (props) => {
  const { width, color, align } = { ...props };
  return (
    <TableItem
      width={width}
      color={color}
      align={align}
    >
      {props.children}
    </TableItem>
  );
};

export default DataTableItem;
