import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import TournamentCard from './tournament-card';
import { useContext, useEffect, useState } from 'react';
import { DataContext, useFind } from '../../utils';
import background from '../../assets/backgrounds/background.png';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${background});
  background-color: ${(props) => props.theme.colors.StrongGray};
  background-size: cover;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  overflow: auto;
  height: 92.7%;
`;

const Tournament = (props) => {
  const dataContext = useContext(DataContext);
  const token = localStorage.getItem('token');
  const { id } = useParams();

  const [tournament, setTournament] = useState(null);
  const [participation, setParticipation] = useState(null);

  const { response, loading, find } = useFind(
    `${dataContext.API}/tournament/get/{id}`
  );

  const {
    response: getParticipationResponse,
    loading: getParticipationloading,
    find: getParticipation,
    clearResponse: getParticipationClearResponse
  } = useFind(`${dataContext.API}/tournament/get/participation/${id}`);

  const getTournament = () => {
    if (id && id !== 'new') {
      const config = {
        headers: {
          Authorization: token
        }
      };
      const additionalURLParams = [
        {
          name: 'id',
          value: id
        }
      ];
      find(config, additionalURLParams);
    }
  };

  useEffect(() => {
    if (getParticipationResponse?.data) {
      setParticipation(getParticipationResponse.data);
      getParticipationClearResponse();
    }
  }, [getParticipationResponse]);

  useEffect(() => {
    if (id) {
      getTournament();
      const config = {
        headers: {
          Authorization: token
        }
      };
      getParticipation(config);
    }
  }, [id, token]);

  useEffect(() => {
    if (response?.data) {
      setTournament(response.data);
    }
  }, [response]);

  return (
    <Container>
      <TournamentCard
        snackbarRef={props.snackbarRef}
        setSnackbar={props.setSnackbar}
        getTournament={getTournament}
        tournament={tournament}
        loading={loading || getParticipationloading}
        finishedParticipating={participation?.finishedParticipating}
      />
    </Container>
  );
};

export default Tournament;
