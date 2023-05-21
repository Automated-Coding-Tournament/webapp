import React, { useState } from 'react';
import {
  ContainedButton,
  TextInput,
  Logo,
  OutlinedButton,
  Popup,
  Repeater,
  TaskScore
} from '../../components';
import { useTheme } from 'styled-components';
import { Select } from '../../components/select';

const clickMe = (text) => {
  alert(text);
};

const UserInteface = () => {
  const theme = useTheme();

  const [basePopupOpen, setBasePopupOpen] = useState(false);
  const toggleBasePopup = () => {
    setBasePopupOpen(!basePopupOpen);
  };

  const [taskScorePopUpOpen, setTaskScorePopUp] = useState(true);
  const toggleTaskScorePopUp = () => {
    setTaskScorePopUp(!taskScorePopUpOpen);
  };

  const [isLoading, setIsLoading] = useState(false);
  const toggleIsLoading = () => {
    setIsLoading(!isLoading);
  };

  const [repeaterItems, setRepeaterItems] = useState([
    {
      label: 'One',
      value: 1
    },
    {
      label: 'OneZero',
      value: 10
    },
    {
      label: 'Five',
      value: 5
    },
    {
      label: 'Test',
      value: '1'
    },
    {
      label: 'Hello',
      value: 'text'
    }
  ]);

  const addItem = () => {
    const items = [...repeaterItems];
    items.push({
      label: 'New',
      value: 2
    });
    setRepeaterItems(items);
  };

  const removeItem = (index) => {
    const items = [...repeaterItems];
    items.splice(index, 1);
    setRepeaterItems(items);
  };

  const handleRetreat = () => {
    alert("Retreated");
    toggleTaskScorePopUp();
  };

  const handleContinue = () => {
    alert("Continue");
    toggleTaskScorePopUp();
  };


  return (
    <div>
      <div>
        <ContainedButton
          value='Contained'
          color={theme.colors.PurpleBlue}
          onClick={() => clickMe('Contained button clicked')}
          loading={isLoading}
        />
        <ContainedButton
          value='Contained Disabled'
          color={theme.colors.PurpleBlue}
          disabled
        />
        <OutlinedButton
          value='Outlined'
          color={theme.colors.PurpleBlue}
          onClick={() => clickMe('Outlined button clicked')}
          loading={isLoading}
        />
        <OutlinedButton
          value='Outlined Disabled'
          color={theme.colors.PurpleBlue}
          disabled
        />
        <OutlinedButton
          value='Set Loading'
          color={theme.colors.PurpleBlue}
          onClick={toggleIsLoading}
        />
      </div>
      <div>
        <TextInput
          label='Small Text Input'
          labelColor={theme.colors.Black}
          size='sm'
          placeholder='Placeholder'
          errorMessage='This is an error'
        />
        <TextInput
          label='Medium Text Input'
          labelColor={theme.colors.Black}
          size='md'
          placeholder='Placeholder'
          required
        />
        <TextInput
          label='Large Text Input'
          labelColor={theme.colors.Black}
          size='lg'
          placeholder='Placeholder'
          errorMessage='This is an error'
        />
        <Select
          label='Select'
          labelColor={theme.colors.Black}
          size='md'
          placeholder='Placeholder'
          errorMessage='This is an error'
          defaultOptionValue={15}
          options={[
            {
              text: 'One',
              value: 1
            },
            {
              text: 'OneZero',
              value: 10
            },
            {
              text: 'Five',
              value: 5
            },
            {
              text: 'Test',
              value: '1'
            },
            {
              text: 'Hello',
              value: 'text'
            }
          ]}
        />
        <Repeater
          label='Repeater'
          labelColor={theme.colors.Black}
          items={repeaterItems}
          onAdd={addItem}
          onRemove={removeItem}
        >
          {repeaterItems?.map((item, index) => {
            return (
              <TextInput
                key={index}
                label={item.label}
                labelColor={theme.colors.Black}
                size='md'
                value={item.value}
                placeholder='Placeholder'
                required
              />
            );
          })}
        </Repeater>
      </div>
      <div>
        <OutlinedButton
          value='Base Popup'
          color={theme.colors.PurpleBlue}
          onClick={toggleBasePopup}
        />
      </div>
      <div>
        <Logo
          height='392px'
          width='582px'
        />
      </div>
      {basePopupOpen && (
        <Popup
          title='Title'
          message='This is a message!'
          closeButtonColor={theme.colors.StrongGray}
          onClose={toggleBasePopup}
          buttons={[
            {
              name: 'Button 1',
              color: theme.colors.LightGray
            },
            {
              name: 'Button 2',
              color: theme.colors.LightGray
            }
          ]}
        />
      )}
      {taskScorePopUpOpen && (
        <TaskScore 
          title ={"Task Completed!"}
          passed = {true}
          totalCount = {2}
          passedCount= {1}
          usedMomory = {24534}
          averageCpu = {23}
          points = {150}
          onRetreat={handleRetreat} 
          onContinue={handleContinue}
        />
      )}
    </div>
  );
};

export default UserInteface;
