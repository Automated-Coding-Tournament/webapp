import React, { forwardRef, useImperativeHandle, useState } from 'react';
import styled, { css } from 'styled-components';

const SnackbarContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  position: fixed;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%, -50%);
  height: 36px;
  border-radius: 10px;
  background-color: ${(props) => props.color || props.theme.colors.PurpleBlue};

  ${(props) =>
    props.showSnackbar
      ? css`
          visibility: visible;
          animation: fade-in 0.5s, fade-out 0.5s 2.5s;
        `
      : css`
          visibility: hidden;
        `}

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const Message = styled.div`
  padding: 8px 16px 8px 16px;
  font-weight: bold;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.Default};
  color: ${(props) => props.textColor || props.theme.colors.White};
`;

const Snack = (props, ref) => {
  const { color, textColor, message } = props.snackbar;

  const [showSnackbar, setShowSnackbar] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 3000);
    }
  }));

  return (
    <SnackbarContainer
      showSnackbar={showSnackbar}
      color={color}
    >
      <Message textColor={textColor}>{message || ''}</Message>
    </SnackbarContainer>
  );
};

const Snackbar = forwardRef(Snack);

export default Snackbar;
