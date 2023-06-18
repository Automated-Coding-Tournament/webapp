import React, { useState, useCallback, useContext, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import CodeEditor from '../../components/code-editor/code-editor';
import { DataContext, useFind, useSave } from '../../utils';
import {
  OutlinedButton,
  Popup,
  TaskScore,
  TextAreaInput
} from '../../components';
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
  const [task, setTask] = useState(null);
  const [participation, setParticipation] = useState(null);
  const [footerText, setFooterText] = useState('');
  const [isfinished, setFinished] = useState(false);

  const [taskScorePopUpOpen, setTaskScorePopUpOpen] = useState(false);
  const toggleTaskScorePopup = () => {
    setTaskScorePopUpOpen(!taskScorePopUpOpen);
  };

  const [finishedPopUpOpen, setFinishedPopUpOpen] = useState(false);
  const toggleFinishedPopup = () => {
    setFinishedPopUpOpen(!finishedPopUpOpen);
  };

  const {
    response: getCodeResponse,
    loading: getCodeLoading,
    find: getCode,
    clearResponse: getCodeClearResponse
  } = useFind(`${dataContext.API}/task/getCode/{id}`);

  const {
    response: getTaskResponse,
    loading: getTaskLoading,
    find: getTask,
    clearResponse: getTaskClearResponse
  } = useFind(`${dataContext.API}/task/get/participation/current/${id}`);

  const {
    response: getParticipationResponse,
    loading: getParticipationloading,
    find: getParticipation,
    clearResponse: getParticipationClearResponse
  } = useFind(`${dataContext.API}/tournament/get/participation/${id}`);

  const {
    response: nextTournamentTaskResponse,
    loading: nextTournamentTaskLoading,
    error: nextTournamentTaskError,
    save: nextTournamentTask,
    clearResponse: nextTournamentTaskClearResponse,
    clearError: nextTournamentTaskClearError
  } = useSave(`${dataContext.API}/task/tournament/next/${id}`);

  const {
    response: saveResponse,
    loading: saveloading,
    error: saveError,
    save,
    clearResponse: saveClearResponse
  } = useSave(`${dataContext.API}/task/submitSolution/{id}`);

  const {
    response: finishTournamentResponse,
    loading: finishTournamentLoading,
    save: finishTournament,
    clearResponse: finishTournamentClearResponse
  } = useSave(`${dataContext.API}/tournament/finish/${id}`);

  useEffect(() => {
    if (id && task === null) {
      const config = {
        headers: {
          Authorization: token
        }
      };
      getTask(config);
      getParticipation(config);
    }
  }, [task, token, id]);

  useEffect(() => {
    if (task?.id) {
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
  }, [token, task?.id]);

  useEffect(() => {
    if (getCodeResponse?.data) {
      setCode(getCodeResponse.data);
      setFooterText('');
      getCodeClearResponse();
    }
  }, [getCodeResponse]);

  useEffect(() => {
    if (getTaskResponse?.data) {
      setTask(getTaskResponse.data);
      setFooterText('');
      getTaskClearResponse();
    }
  }, [getTaskResponse]);

  useEffect(() => {
    if (getParticipationResponse?.data) {
      setParticipation(getParticipationResponse.data);
      setFooterText('');
      if (getParticipationResponse.data?.finishedParticipating) {
        setFinished(true);
      } else if (getParticipationResponse.data?.finishedCurrentTask) {
        setTaskScorePopUpOpen(true);
      }
      getParticipationClearResponse();
    }
  }, [getParticipationResponse]);

  useEffect(() => {
    if (nextTournamentTaskResponse) {
      if (nextTournamentTaskResponse?.status === 200) {
        setTask(null);
        toggleTaskScorePopup();
      }
      nextTournamentTaskClearResponse();
    }
  }, [nextTournamentTaskResponse]);

  useEffect(() => {
    if (nextTournamentTaskError) {
      if (nextTournamentTaskError.response?.status === 400) {
        toggleTaskScorePopup();
        toggleFinishedPopup();
      }
      nextTournamentTaskClearError();
    }
  }, [nextTournamentTaskError]);

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
  }, [token, task?.id, code]);

  useEffect(() => {
    if (isfinished) {
      navigate(`/tournament/${id}`);
    }
  }, [isfinished]);

  useEffect(() => {
    if (finishTournamentResponse?.status === 200) {
      finishTournamentClearResponse();
      navigate(`/tournament/${id}`);
    }
  }, [finishTournamentResponse]);

  useEffect(() => {
    if (saveResponse?.data) {
      const config = {
        headers: {
          Authorization: token
        }
      };
      getParticipation(config);
      toggleTaskScorePopup();
      saveClearResponse();
    }
  }, [saveResponse]);

  const handleContinue = (passed) => {
    if (passed) {
      const config = {
        headers: {
          Authorization: token
        }
      };
      nextTournamentTask({}, config);
    } else {
      const config = {
        headers: {
          Authorization: token
        }
      };
      getParticipation(config);
      toggleTaskScorePopup();
    }
  };

  const handleRetreat = () => {
    const config = {
      headers: {
        Authorization: token
      }
    };
    finishTournament({}, config);
  };

  return (
    <Container>
      <PageContainer>
        <ToolbarContainer>
          <ToolbarItemsContainer>
            <Title>{task?.title || 'Title missing'}</Title>
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
              value={getCodeLoading ? 'Loading...' : code}
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
                  getTaskLoading || getParticipationloading
                    ? 'Loading...'
                    : task?.description || 'Description missing'
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
      {taskScorePopUpOpen && (
        <TaskScore
          title={participation?.passed ? 'Task Completed!' : 'Task Failed!'}
          passed={participation?.passed}
          totalCount={participation?.totalTestCases}
          passedCount={participation?.passedTestCases}
          usedMemory={participation?.memoryInKilobytes}
          averageCpu={participation?.averageCpuTime}
          points={participation?.points}
          onRetreat={handleRetreat}
          onRetreatLoading={finishTournamentLoading}
          onRetreatButtonVisible={
            !(participation?.passed && participation?.lastTask)
          }
          onContinue={() => handleContinue(participation?.passed)}
          onContinueLoading={nextTournamentTaskLoading}
        />
      )}
      {finishedPopUpOpen && (
        <Popup
          title='Congratulations!'
          message='You have successfully solved all the tasks!'
          closeButtonColor={theme.colors.PurpleBlue}
          onClose={handleRetreat}
        />
      )}
    </Container>
  );
};

export default SolveTask;
