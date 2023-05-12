import React from 'react';
import styled, { css } from 'styled-components';

const Button = styled.div`
  position: relative;
  padding: 2px 4px 2px 4px;
  cursor: pointer;
  height: ${(props) => props.width || '32px'};

  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
    `}

  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const IconButton = (props) => {
  const {
    children,
    onClick,
    className,
    disabled = false,
    ...buttonProps
  } = props;
  return (
    <Button
      {...buttonProps}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default IconButton;
