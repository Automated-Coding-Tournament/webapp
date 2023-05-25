import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 4px 8px 4px 8px;
  margin: 4px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  font-family: ${(props) => props.theme.fonts.Default};
  padding: 4px 8px 4px 8px;
  margin: 2px;
  color: ${(props) => props.labelColor || props.theme.colors.White};
`;

const InputField = styled.input`
  height: ${(props) => props.height || '32px'};
  min-width: 84px;
  width: ${(props) => {
    switch (props.size) {
      case 'xs':
        return '100px';
      case 'sm':
        return '160px';
      case 'md':
        return '200px';
      case 'lg':
        return '300px';
      default:
        return props.width || 'auto';
    }
  }};
  font-family: ${(props) => props.theme.fonts.InriaSerif};
  color: ${(props) => props.theme.colors.White};
  background: ${(props) => `${props.theme.colors.Black}E5`};
  border: 2px solid
    ${(props) =>
      props.errorMessage
        ? props.theme.colors.Red
        : props.theme.colors.DarkGray};
  border-radius: 10px;
  padding: 4px 8px 4px 8px;
  outline: none;

  ::placeholder {
    color: ${(props) => props.theme.colors.LightGray};
    font-family: ${(props) => props.theme.fonts.InriaSerif};
  }

  &:focus {
    border-color: ${(props) =>
      props.errorMessage
        ? props.theme.colors.Red
        : props.theme.colors.LightGray};
  }
`;

const ErrorStar = styled.span`
  font-size: 16px;
  font-weight: bold;
  padding: 2px 4px 2px 4px;
  font-family: ${(props) => props.theme.fonts.Default};
  color: ${(props) => props.theme.colors.Red};
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  font-family: ${(props) => props.theme.fonts.Default};
  color: ${(props) => props.theme.colors.Red};
  padding: 4px 8px 4px 8px;
  margin: 2px;
`;

const InputBase = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const {
    label,
    labelColor,
    type,
    size,
    onChange,
    required,
    errorMessage,
    ...inputProps
  } = props;

  const handleFocus = () => {
    setIsFocused(!isFocused);
  };

  return (
    <InputContainer>
      <Label labelColor={labelColor}>
        {label}
        {required && <ErrorStar>*</ErrorStar>}
      </Label>
      <InputField
        {...inputProps}
        type={type}
        size={size}
        onChange={(e) => onChange(e)}
        onBlur={handleFocus}
        onFocus={handleFocus}
        errorMessage={errorMessage}
      />
      <ErrorMessage>{errorMessage || ''}</ErrorMessage>
    </InputContainer>
  );
};

export default InputBase;
