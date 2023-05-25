import React from 'react';
import styled, { useTheme } from 'styled-components';
import { ContainedButton, OutlinedButton } from '../button';
import background from '../../assets/backgrounds/background.png';

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`;

const PopupBase = styled.div`
  position: relative;
  width: 500px;
  margin: 0 auto;
  height: auto;
  max-height: 70vh;
  margin-top: calc(100vh - 85vh - 20px);
  border-radius: 10px;
  padding: 10px;
  border: 3px solid ${(props) => props.theme.colors.StrongGray};
  overflow: auto;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  background-image: url(${background});
  background-color: ${(props) => props.theme.colors.StrongGray};
  background-size: cover;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow: auto;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding: 4px;
  font-size: 32px;
  font-weight: bold;
  font-family: ${(props) => props.theme.fonts.InriaSerif};
  color: ${(props) => props.theme.colors.White};
`;

const MessageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding: 4px;
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.InriaSerif};
  color: ${(props) => props.theme.colors.White};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 10px;
  padding: 4px;
`;

const Popup = (props) => {
  const {
    title,
    message,
    buttons,
    closeButtonVisable = true,
    closeButtonColor,
    onClose
  } = props;
  const theme = useTheme();
  return (
    <Container>
      <PopupBase>
        <TitleContainer>{title}</TitleContainer>
        <MessageContainer>{message}</MessageContainer>
        <ButtonContainer>
          {buttons?.length > 0 &&
            buttons.map((item, key) =>
              item.type === 'outlined' ? (
                <OutlinedButton
                  key={key}
                  size='xs'
                  value={item.name}
                  color={item.color || theme.colors.PurpleBlue}
                  onClick={item.onClick}
                  loading={item.loading}
                />
              ) : (
                <ContainedButton
                  key={key}
                  size='xs'
                  value={item.name}
                  color={item.color || theme.colors.PurpleBlue}
                  onClick={item.onClick}
                  loading={item.loading}
                />
              )
            )}
          {closeButtonVisable && (
            <OutlinedButton
              size='xs'
              value='Close'
              color={closeButtonColor || theme.colors.PurpleBlue}
              onClick={onClose}
            />
          )}
        </ButtonContainer>
      </PopupBase>
    </Container>
  );
};

export default Popup;
