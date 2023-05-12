import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTheme } from 'styled-components';
import { ContainedButton, Form } from '../../components';
import { useNavigate } from 'react-router-dom';
import { DataContext, useFind } from '../../utils';

const Container = styled.div`
  height: calc(100% - ${(props) => props.topBar?.offsetHeight || 0}px);
  background-color: ${(props) => props.theme.colors.StrongGray};
`;

const Userprofile = styled.div`
  display: flex;
  align-items: center;
  width: 500px;
  font-family: ${(props) => props.theme.fonts.Default};
  color: ${(props) => props.theme.colors.White};
`;

const Userinfo = styled.div`
  font-size: 1.2rem;
  line-height: 1.5;
  font-color: white;
  margin-left: 1px;
  display: flex;
  flex-wrap: wrap;
`;
const UserInfoColumn = styled.div`
  flex: 1;
`;

const Points = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  background-color: ${(props) => props.theme.colors.React};
  color: ${(props) => props.theme.colors.White};
  font-family: ${(props) => props.theme.fonts.Default};
  font-size: 1.5rem;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Circle = styled.div`
  height: 50px;
  width: 100%;
  float: left;
  display: flex;
  border-radius: 40px;
  border: 3px solid ${(props) => props.theme.colors.BlazeBlue};
  font-family: ${(props) => props.theme.fonts.Default};
  color: ${(props) => props.theme.colors.White};
`;

const CircleText = styled.div`
  display: flex;
  font-size: 25px;
  font-weight: bold;
  padding-top: 10px;
  font-family: ${(props) => props.theme.fonts.Default};
  color: ${(props) => props.theme.colors.White};
  margin-left: 50px;
`;

const Sponsor = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  border: 3px solid ${(props) => props.theme.colors.BlazeBlue};
  color: ${(props) => props.theme.colors.White};
  font-family: ${(props) => props.theme.fonts.Default};
  font-size: 1.2rem;
  padding: 10px;
  margin-top: 20px;
  border-radius: 40px;
`;

const TournamentCardWrapper = styled.div`
  background: ${(props) => `${props.theme.colors.Black}E5`};
  border: 3px solid ${(props) => props.theme.colors.BlazeBlue};
  border-radius: 8px;
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

const TournamentGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0 auto;
  max-width: 1000px; // Adjust this value to fit two cards in a row
`;

const TournamentCardText = styled.p`
  margin: 10px 0;
  font-size: 16px;
  color: #ffffff;
`;

const TournamentTitleOfText = styled.div`
  font-weight: bold;
`;

function userprofile({ user }) {
  const topBar = document.getElementById('topBar');
  const theme = useTheme();
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);
  const [tournament, setTournament] = useState(null);
  const { response, find } = useFind(
    `${dataContext.API}/tournament/get/history`
  );
  const token = localStorage.getItem('token');
  useEffect(() => {
    find({
      headers: {
        Authorization: token
      }
    });
  }, []);
  useEffect(() => {
    if (response?.data) {
      setTournament(response.data);
    }
  }, [response]);
  // TournamentCard component
  const TournamentCard = (props) => {
    const { name, startDate, endDate, difficulty, status, creatorUser } = props;

    return (
      <TournamentCardWrapper>
        <TournamentCardTitle>{name}</TournamentCardTitle>
        <TournamentCardInfo>
          <TournamentCardText>
            <TournamentTitleOfText>Start date:</TournamentTitleOfText>
            {startDate}
          </TournamentCardText>
          <TournamentCardText>
            <TournamentTitleOfText>End date: </TournamentTitleOfText>
            {endDate}
          </TournamentCardText>
          <TournamentCardText>
            <TournamentTitleOfText>Difficulty: </TournamentTitleOfText>
            {difficulty}
          </TournamentCardText>
          <TournamentCardText>
            <TournamentTitleOfText>Organizer: </TournamentTitleOfText>
            {creatorUser}
          </TournamentCardText>
          <TournamentCardText>
            <TournamentTitleOfText>Status:</TournamentTitleOfText>
            {status}
          </TournamentCardText>
        </TournamentCardInfo>
      </TournamentCardWrapper>
    );
  };

  return (
    <Container topBar={topBar}>
      <Form
        showSubmitButton={false}
        showCancelButton={false}
      >
        <Circle>
          <CircleText>{user?.level}</CircleText>
        </Circle>
        <Points>Points: {user?.points}</Points>
        {user?.role === 'ROLE_SPONSOR' ? (
          <Sponsor>Sponsor</Sponsor>
        ) : (
          <Sponsor>Programmer</Sponsor>
        )}
        <Userprofile>
          <Userinfo>
            <UserInfoColumn>
              <h1>
                {user?.name} {user?.surname}
              </h1>
              <p>Username: {user?.username}</p>
              <p>Email: {user?.email}</p>
              <p>Phone number: {user?.phoneNumber}</p>
            </UserInfoColumn>
          </Userinfo>
        </Userprofile>
        <ContainedButton
          value='Edit Profile'
          color={theme.colors.PurpleBlue}
          onClick={() => navigate('/profile/edit', { state: user })}
        ></ContainedButton>
      </Form>
      <TournamentGrid>
        <TournamentCardTitle>Turnyrų istorija</TournamentCardTitle>
        {tournament &&
          tournament.map((t, index) => (
            <TournamentCard
              key={index}
              name={t.name}
              startDate={t.startDate}
              endDate={t.endDate}
              difficulty={t.difficulty}
              status={t.status}
              creatorUser={t.creatorUser.username}
              onButtonClick={() => {
                // handleButtonClick logic
              }}
            />
          ))}
      </TournamentGrid>
    </Container>
  );
}

export default userprofile;
