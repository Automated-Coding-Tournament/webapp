import React from 'react';
import { useNavigate } from 'react-router';
import styled, { useTheme } from 'styled-components';
import { ContainedButton, OutlinedButton } from '../button';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const FormFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
`;

const FormElement = styled.form`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width || 'auto'};
  background: ${(props) => `${props.theme.colors.Black}E5`};
  border: 3px solid ${(props) => props.theme.colors.BlazeBlue};
  padding: 20px;
  border-radius: 10px;
`;

const Title = styled.h1`
  text-align: center;
  font-family: ${(props) => props.theme.fonts.Default};
  color: ${(props) => props.theme.colors.White};
  margin: auto;
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  font-family: ${(props) => props.theme.fonts.Default};
  color: ${(props) => props.theme.colors.Red};
  padding-left: 4px;
`;

const Form = (props) => {
  const navigate = useNavigate();
  const {
    title,
    onSubmit,
    loading,
    errorMessage,
    showSubmitButton = true,
    submitButtonTitle,
    submitButtonColor,
    showCancelButton = true,
    submitCancelTitle,
    submitCancelColor,
    children
  } = props;
  const theme = useTheme();
  return (
    <FormContainer>
      <FormElement
        onSubmit={onSubmit}
        width={props.width}
      >
        <Title>{title}</Title>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <FormFieldsContainer>{children}</FormFieldsContainer>
        <ActionButtonsContainer>
          {showSubmitButton && (
            <ContainedButton
              size='xs'
              type='submit'
              value={submitButtonTitle || 'Submit'}
              color={submitButtonColor || theme.colors.PurpleBlue}
              loading={loading}
            />
          )}
          {showCancelButton && (
            <OutlinedButton
              size='xs'
              type='reset'
              value={submitCancelTitle || 'Cancel'}
              color={submitCancelColor || theme.colors.PurpleBlue}
              onClick={() => navigate(-1)}
            />
          )}
        </ActionButtonsContainer>
      </FormElement>
    </FormContainer>
  );
};

export default Form;
