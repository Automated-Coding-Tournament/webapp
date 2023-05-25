import React from 'react';
import styled, { css } from 'styled-components';

const TableRow = styled.tr`
  border-bottom: ${(props) =>
    `${props.borderSize || '1px'} solid${props.theme.colors.BlazeBlue}`};
  border-radius: 10px;
  height: 48px;
  ${(props) =>
    props.hovarable &&
    css`
      &:hover {
        box-shadow: 0 2px 16px ${(props) => props.theme.colors.BlazeBlue};
        transform: translateY(-1px);
      }
    `}

  ${(props) =>
    props.clickable &&
    css`
      cursor: pointer;
    `}
`;

const DataTableRow = (props) => {
  const { borderSize, hovarable = true, clickable = false, onClick } = props;
  return (
    <TableRow
      borderSize={borderSize}
      hovarable={hovarable}
      clickable={clickable}
      onClick={onClick}
    >
      {props.children}
    </TableRow>
  );
};

export default DataTableRow;
