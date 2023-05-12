import React, { useContext, useEffect, useState } from 'react';
import TournamentCard from './tournament';
import { DataContext, useFind } from '../../utils';
import styled from 'styled-components';

const TournamentGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 0 auto;
  max-width: 1000px; // Adjust this value to fit two cards in a row
`;

const Tournament = () => {
  const dataContext = useContext(DataContext);
  const [tournament, setTournament] = useState(null);
  const { response, find } = useFind(`${dataContext.API}/tournament/get/all`);

  useEffect(() => {
    find();
  }, []);

  useEffect(() => {
    if (response?.data) {
      setTournament(response.data);
    }
  }, [response]);

  return (
    <TournamentGrid>
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
  );
};

export default Tournament;
