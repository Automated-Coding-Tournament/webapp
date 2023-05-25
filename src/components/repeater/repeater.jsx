import React, { Children } from 'react';
import styled, { useTheme } from 'styled-components';
import { OutlinedButton } from '../button';
import { IconButton } from '../icon-button';
import { DeleteIcon } from '../icons';

const RepeaterContainer = styled.div`
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

const RepeaterItemsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0px;
  margin: 0px;
`;

const RepeaterItemContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  margin: 0px;
`;

const Repeater = (props) => {
  const {
    label,
    labelColor,
    addButtonText,
    onAdd,
    onRemove,
    firstItemRequired,
    addButtonVisible = true
  } = props;
  const theme = useTheme();

  const AddItem = () => {
    if (onAdd) {
      onAdd();
    }
  };

  const RemoveItem = (key) => {
    if (onRemove) {
      onRemove(key);
    }
  };

  return (
    <RepeaterContainer>
      <Label labelColor={labelColor}>{label}</Label>
      {props.children?.length > 0 ? (
        <RepeaterItemsContainer>
          {Children.map(props.children, (child, index) => (
            <RepeaterItemContainer key={index}>
              {child}
              {index === 0 && firstItemRequired ? (
                <></>
              ) : (
                <IconButton onClick={() => RemoveItem(index)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </RepeaterItemContainer>
          ))}
        </RepeaterItemsContainer>
      ) : (
        <Label labelColor={labelColor}>No items added</Label>
      )}
      {addButtonVisible && (
        <OutlinedButton
          type='button'
          value={addButtonText || 'Add Item'}
          size='sm'
          color={theme.colors.PurpleBlue}
          onClick={AddItem}
        />
      )}
    </RepeaterContainer>
  );
};

export default Repeater;
