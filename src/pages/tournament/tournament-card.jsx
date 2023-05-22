import styled, { useTheme } from 'styled-components';
import React, { useEffect, useCallback, useContext } from 'react';
import { DataContext, useSave } from '../../utils';
import { useParams, useNavigate } from 'react-router-dom';

const CardContainer = styled.div`
  width: 600px;
  background: ${(props) => `${props.theme.colors.Black}E5`};
  border: 3px solid ${(props) => props.theme.colors.BlazeBlue};
  border-radius: 10px;
  padding: 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Section = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
`;

const Subsection = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: ${(props) => props.theme.colors.White};
  margin-bottom: 5px;
`;

const Date = styled.p`
  font-size: 18px;
  font-family: ${(props) => props.theme.fonts.Default};
  color: ${(props) => props.theme.colors.White};
  margin-bottom: 5px;
`;

const Description = styled.p`
  font-size: 18px;
  font-family: ${(props) => props.theme.fonts.Default};
  color: ${(props) => props.theme.colors.White};
  margin-bottom: 5px;
`;

const Points = styled.p`
  font-size: 18px;
  font-family: ${(props) => props.theme.fonts.Default};
  color: ${(props) => props.theme.colors.White};
  margin-bottom: 5px;
`;

const Difficulty = styled.p`
  font-size: 18px;
  font-family: ${(props) => props.theme.fonts.Default};
  color: ${(props) => props.theme.colors.White};
  margin-bottom: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.PurpleBlue};
  color: ${(props) => props.theme.colors.White};
  font-family: ${(props) => props.theme.fonts.Default};
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
`;

const TournamentCard = (props) => {
  const { tournament, loading } = props;
  const { id } = useParams();
  const dataContext = useContext(DataContext);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const theme = useTheme();

  const { response: registerResponse, save: register } = useSave(
    `${dataContext.API}/tournament/register/{id}`
  );

  const handleRegister = useCallback(() => {
    if (id) {
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
      register({}, config, additionalURLParams);
    }
  }, [register, token]);

  useEffect(() => {
    if (registerResponse?.status === 200) {
      props.getTournament();
      props.setSnackbar({
        color: theme.colors.DarkGreen,
        message: 'Registered successfuly!'
      });
      props.snackbarRef.current.show();
    }
  }, [registerResponse]);

  const handleSolveTask = () => {
    navigate(`/solve_task/${id}`);
  };

  return (
    <CardContainer>
      {loading ? (
        <Title>Loading...</Title>
      ) : (
        <>
          <Title>{tournament?.name}</Title>
          <Section>
            <Subsection>
              <Date>Start Date: {tournament?.startDate}</Date>
              <Date>End Date: {tournament?.endDate}</Date>
              <Difficulty>Difficulty: {tournament?.difficulty}</Difficulty>
            </Subsection>
            <Subsection>
              <Points>
                First Place: {tournament?.firstPlacePoints} points
              </Points>
              <Points>
                Second Place: {tournament?.secondPlacePoints} points
              </Points>
              <Points>
                Third Place: {tournament?.thirdPlacePoints} points
              </Points>
            </Subsection>
          </Section>
          <Description>{tournament?.description}</Description>
          {tournament?.status === dataContext.TOURNAMENT_STATUS.REGISTRATION &&
            !tournament?.registered && (
              <Button onClick={handleRegister}>Register</Button>
            )}
          {tournament?.status === dataContext.TOURNAMENT_STATUS.STARTED &&
            tournament?.registered && (
              <Button onClick={handleSolveTask}>Solve Task</Button>
            )}
        </>
      )}
    </CardContainer>
  );
};

export default TournamentCard;
