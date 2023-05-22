import React, { useState, useCallback, useContext, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { useParams } from 'react-router-dom';
import CodeEditor from '../../components/code-editor/code-editor';
import { DataContext, useFind, useSave } from '../../utils';
import { OutlinedButton, TextAreaInput } from '../../components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.colors.StrongGray};
  background-size: cover;
  overflow: auto;
  height: 92.7%;
`;

const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  width: 90%;
`;

const ToolbarContainer = styled.div`
  position: relative;
  width: 100%;
`;

const ToolbarItemsContainer = styled.div`
  position: relative;
  background: ${(props) => `${props.theme.colors.Black}E5`};
  border: 3px solid ${(props) => props.theme.colors.BlazeBlue};
  border-radius: 10px;
  margin: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-family: ${(props) => props.theme.fonts.Default};
  color: ${(props) => props.theme.colors.White};
  margin: 0;
  padding-left: 16px;
`;

const ContenctContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const InfoContainer = styled.div`
  position: relative;
  background: ${(props) => `${props.theme.colors.Black}E5`};
  border: 3px solid ${(props) => props.theme.colors.BlazeBlue};
  border-radius: 10px;
  margin: 8px;
`;

const EditorContainer = styled.div`
  position: relative;
  background: ${(props) => `${props.theme.colors.Black}E5`};
  border: 3px solid ${(props) => props.theme.colors.BlazeBlue};
  border-radius: 10px;
  width: 60%;
  margin: 8px;
  padding: 16px;
`;

const UtilsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  height: 100%;
`;

const ButtonsContainer = styled.div`
  padding: 8px;
`;

const SolveTask = () => {
  const token = localStorage.getItem('token');
  const dataContext = useContext(DataContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();

  const [code, setCode] = useState('');
  const [task, setTask] = useState({});
  const [footerText, setFooterText] = useState('');
  const [isfinished, setFinished] = useState(false);

  const {
    response: getCodeResponse,
    loading: getcodeloading,
    find: getCode
  } = useFind(`${dataContext.API}/task/getCode/{id}`);

  const {
    response: getTaskResponse,
    loading: getTaskloading,
    error: getTaskError,
    find: nextTournamentTask
  } = useFind(`${dataContext.API}/task/get/nextTournamentTask/${id}`);

  const {
    response: saveResponse,
    loading: saveloading,
    error: saveError,
    save
  } = useSave(`${dataContext.API}/task/submitSolution/{id}`);

  const { response: saveTournamentResponse, save: saveTournament } = useSave(
    `${dataContext.API}/tournament/finish/${id}`
  );

  useEffect(() => {
    if (isfinished) {
      const config = {
        headers: {
          Authorization: token
        }
      };
      saveTournament({}, config);
    }
  }, [isfinished]);

  useEffect(() => {
    if (id) {
      const config = {
        headers: {
          Authorization: token
        }
      };
      nextTournamentTask(config);
    }
  }, [token, id]);

  useEffect(() => {
    if (task.id) {
      const config = {
        headers: {
          Authorization: token
        },
        params: {
          tournamentId: id
        }
      };
      const additionalURLParams = [
        {
          name: 'id',
          value: task.id
        }
      ];
      getCode(config, additionalURLParams);
    }
  }, [token, task.id]);

  useEffect(() => {
    if (getCodeResponse?.data) {
      setCode(getCodeResponse.data);
      setFooterText('');
    }
  }, [getCodeResponse]);

  useEffect(() => {
    if (getTaskResponse?.data) {
      setTask(getTaskResponse.data);
      setFooterText('');
    }
  }, [getTaskResponse]);

  useEffect(() => {
    if (getTaskError?.response?.status === 404) {
      setFinished(true);
    }
  }, [getTaskError]);

  useEffect(() => {
    if (saveError?.response?.status === 406) {
      setFooterText(saveError.response.data?.message || '');
    } else {
      setFooterText('');
    }
  }, [saveError]);

  const onChange = useCallback((value) => {
    setCode(value);
  }, []);

  const handleSubmit = useCallback(() => {
    if (id && code) {
      const request = code;
      const config = {
        headers: {
          'Authorization': token,
          'Content-Type': 'text/plain'
        },
        params: {
          tournamentId: id
        }
      };
      const additionalURLParams = [
        {
          name: 'id',
          value: task.id
        }
      ];
      save(request, config, additionalURLParams);
      setFooterText('');
    }
  }, [token, task.id, code]);

  useEffect(() => {
    if (isfinished) {
      navigate(-1);
    }
  }, [saveTournamentResponse]);

  useEffect(() => {
    if (saveResponse?.data) {
      if (saveResponse.data.passed) {
        setFooterText(
          `Congratulations! All tests passed. You recieve ${task.points} points.`
        );
      } else {
        setFooterText(
          `${saveResponse.data.passedTestCases} out of ${saveResponse.data.totalTestCases} test cases passed.`
        );
      }
    }
  }, [saveResponse]);
  return (
    <Container>
      <PageContainer>
        <ToolbarContainer>
          <ToolbarItemsContainer>
            <Title>{task.title || 'Title missing'}</Title>
            <ButtonsContainer>
              <OutlinedButton
                value='Submit'
                size='md'
                color={theme.colors.PurpleBlue}
                onClick={handleSubmit}
                loading={saveloading}
              />
            </ButtonsContainer>
          </ToolbarItemsContainer>
        </ToolbarContainer>
        <ContenctContainer>
          <EditorContainer>
            <CodeEditor
              value={getcodeloading ? 'Loading...' : code}
              onChange={onChange}
              height='65vh'
            />
          </EditorContainer>
          <UtilsContainer>
            <InfoContainer>
              <TextAreaInput
                label='Description'
                height='30vh'
                value={
                  getTaskloading
                    ? 'Loading...'
                    : task.description || 'Description missing'
                }
                disabled
              />
            </InfoContainer>
            <InfoContainer>
              <TextAreaInput
                label='Output'
                height='15vh'
                value={saveloading ? 'Solving...' : footerText}
                disabled
              />
            </InfoContainer>
          </UtilsContainer>
        </ContenctContainer>
      </PageContainer>
    </Container>
  );
};

export default SolveTask;
