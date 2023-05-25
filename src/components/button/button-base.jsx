import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  position: relative;
  padding: 4px 8px 4px 8px;
  cursor: pointer;
  min-width: 84px;
  width: ${(props) => {
    switch (props.size) {
      case 'xs':
        return '84px';
      case 'sm':
        return '126px';
      case 'md':
        return '168px';
      case 'lg':
        return '336px';
    }
  }};
  height: 32px;
  margin: 4px;
  border-radius: 10px;
  background: ${(props) => props.theme.colors.Default};

  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ValueContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 24px;
`;

const Text = styled.span`
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  font-family: ${(props) => props.theme.fonts.Default};
`;

const Loader = styled.span`
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 2px solid transparent;
  border-top-color: black;
  border-radius: 50%;
  animation: button-loading-spinner 1s ease infinite;

  @keyframes button-loading-spinner {
    from {
      transform: rotate(0turn);
    }

    to {
      transform: rotate(1turn);
    }
  }
`;

const ButtonBase = (props) => {
  const {
    className,
    value,
    icon,
    iconPossition = 'left',
    onClick,
    loading,
    disabled,
    ...buttonProps
  } = props;
  return (
    <Button
      {...buttonProps}
      className={className}
      onClick={!loading ? onClick : () => {}}
      disabled={disabled}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          {icon ? (
            <ValueContainer>
              {iconPossition === 'left' && icon}
              <Text>{value}</Text>
              {iconPossition === 'right' && icon}
            </ValueContainer>
          ) : (
            <Text>{value}</Text>
          )}
        </>
      )}
    </Button>
  );
};

export default ButtonBase;
