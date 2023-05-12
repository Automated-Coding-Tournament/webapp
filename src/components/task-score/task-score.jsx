import React from 'react';
import styled, { useTheme } from 'styled-components';
import { PassedIcon, FailedIcon } from '../../components/icons';
import bgDeco from '../../assets/backgrounds/taskScore-bg.png';
import { OutlinedButton } from '../button';

const Container = styled.div`
  position: fixed;
  background: #00000050;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`;

const PopupBase = styled.div`
  position: relative;
  width: 580px;
  margin: 0 auto;
  height: auto;
  max-height: 70vh;
  margin-top: calc(100vh - 85vh - 20px);
  border-radius: 50px;
  padding: 50px;
  border: 5px solid ${(props) => props.theme.colors.black};
  overflow: auto;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  background-image: url(${bgDeco});
  background-size: cover;
  
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px;
  font-size: 32px;
  font-weight: bold;
  font-family: ${(props) => props.theme.fonts.InriaSerif};
`;

const ContentBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

const StatusMarkContainer = styled.div`
  display: flex;
  width: 71px;
  height: 73px;
  padding-top: 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  padding: 19px 0px;
  gap: 36px;
`;

const TaskResultTextContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px;
  font-size: 28px;
  font-family: ${(props) => props.theme.fonts.InriaSerif};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px;
`;

const TaskScore = (props) => {
  const {
    title = "Task Completed!",
    passed = true,
    totalCount = 2,
    passedCount= 1,
    usedMomory = 24534,
    averageCpu = 23,
    points = 150,
    onContinue,
    onRetreat
  } = props;
  const theme = useTheme();
  return (
    <Container>
      <PopupBase>
        <TitleContainer>{title}</TitleContainer>
        <ContentBase>
          <StatusMarkContainer>
            {passed === true  && (<PassedIcon/>)}
            {passed === false  && (<FailedIcon/>)}
          </StatusMarkContainer>
          <InfoContainer>
            <TaskResultTextContainer>{"Passed :"}</TaskResultTextContainer>
            <TaskResultTextContainer>{passedCount}{"/"}{totalCount}</TaskResultTextContainer>
          </InfoContainer>
          <InfoContainer>
            <TaskResultTextContainer>{"Used Memory :"}</TaskResultTextContainer>
            <TaskResultTextContainer>{usedMomory}{"Kb"}</TaskResultTextContainer>
          </InfoContainer>
          <InfoContainer>
            <TaskResultTextContainer>{"CPU time :"}</TaskResultTextContainer>
            <TaskResultTextContainer>{averageCpu}{"s"}</TaskResultTextContainer>
          </InfoContainer>
          <InfoContainer>
            <TaskResultTextContainer>{"Points :"}</TaskResultTextContainer>
            <TaskResultTextContainer>{points}</TaskResultTextContainer>
          </InfoContainer>
        </ContentBase>
        <ButtonContainer>
        <OutlinedButton
                  size='m'
                  value="Retreat"
                  color={theme.colors.PurpleBlue}
                  onClick={onContinue}
                />
        <OutlinedButton
                  size='m'
                  value="Continue"
                  color={theme.colors.PurpleBlue}
                  onClick={onRetreat}
                />
        </ButtonContainer>
      </PopupBase>
    </Container>
  );
};

export default TaskScore;
