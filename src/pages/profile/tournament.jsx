import React from 'react';
import styled from 'styled-components';

const TournamentCardWrapper = styled.div`
  background: ${(props) => `${props.theme.colors.Black}E5`};
  border: 3px solid ${(props) => props.theme.colors.BlazeBlue};
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  width: 100%; // Updated width to 100%
  margin: 10px 0; // Updated margin to remove horizontal margin
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 8px 16px ${(props) => props.theme.colors.BlazeBlue};
    transform: translateY(-5px);
  }
`;

const TournamentCardTitle = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  color: #ffffff;
`;

const TournamentCardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 16px;
  color: #ffffff;
  margin: 10px 0;
`;

const TournamentCardButton = styled.button`
  background-color: #007bff;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 20px 0;
  transition-duration: 0.3s;

  &:hover {
    background-color: #0056b3;
    color: white;
  }
`;

const TournamentCardText = styled.p`
  margin: 10px 0;
  font-size: 16px;
  color: #ffffff;
`;

const TournamentTitleOfText = styled.div`
  font-weight: bold;
`;

const TournamentCard = (props) => {
  const {
    name,
    startDate,
    endDate,
    difficulty,
    status,
    creatorUser,
    onButtonClick
  } = props;

  return (
    <TournamentCardWrapper>
      <TournamentCardTitle>{name}</TournamentCardTitle>
      <TournamentCardInfo>
        <TournamentCardText>
          {' '}
          <TournamentTitleOfText>Start date:</TournamentTitleOfText>
          {startDate}
        </TournamentCardText>
        <TournamentCardText>
          <TournamentTitleOfText>End date: </TournamentTitleOfText>
          {endDate}
        </TournamentCardText>
        <TournamentCardText>
          {' '}
          <TournamentTitleOfText>Difficulty: </TournamentTitleOfText>
          {difficulty}
        </TournamentCardText>
        <TournamentCardText>
          {' '}
          <TournamentTitleOfText>Organizer: </TournamentTitleOfText>{' '}
          {creatorUser}
        </TournamentCardText>
        <TournamentCardText>
          {' '}
          <TournamentTitleOfText>Status:</TournamentTitleOfText>
          {status}
        </TournamentCardText>
      </TournamentCardInfo>
      <TournamentCardButton onClick={onButtonClick}>
        View more!
      </TournamentCardButton>
    </TournamentCardWrapper>
  );
};

export default TournamentCard;
