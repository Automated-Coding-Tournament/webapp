import React, { useContext, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import {
  DataTable,
  DataTableBody,
  DataTableContainer,
  DataTableHeader,
  DataTableItem,
  DataTableRow,
  DataTableToolbar,
  DeleteIcon,
  EditIcon,
  IconButton,
  OutlinedButton,
  Popup
} from '../../components';
import { useNavigate } from 'react-router-dom';
import { DataContext, Pluralize, useFind, useRemove } from '../../utils';
import jwtDecode from 'jwt-decode';

const Container = styled.div`
  height: calc(100% - ${(props) => props.topBar?.offsetHeight || 0}px);
  background-color: ${(props) => props.theme.colors.StrongGray};
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Text = styled.p`
  color: ${(props) => props.theme.colors.White};
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const TaskList = () => {
  const topBar = document.getElementById('topBar');
  const dataContext = useContext(DataContext);
  const token = localStorage.getItem('token');
  let role = null;
  if (token) {
    role = jwtDecode(token).authorities;
  }
  const theme = useTheme();
  const navigate = useNavigate();

  if (role && role === dataContext.ROLES.USER) {
    navigate('/');
  }

  const [tasks, setTasks] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);

  const toggleDeletePopup = () => {
    setDeletePopupOpen(!deletePopupOpen);
  };

  const {
    response: findResponse,
    loading: findLoading,
    find
  } = useFind(`${dataContext.API}/task/getAll`);

  const {
    response: removeResponse,
    loading: removeLoading,
    remove
  } = useRemove(`${dataContext.API}/task/delete/{id}`);

  useEffect(() => {
    find({
      headers: {
        Authorization: token
      }
    });
  }, []);

  useEffect(() => {
    if (findResponse?.data) {
      setTasks(findResponse.data);
    }
  }, [findResponse]);

  useEffect(() => {
    if (removeResponse?.status === 200) {
      toggleDeletePopup();
      setTaskToDelete(null);
      setTasks(tasks.filter((task) => task.id !== taskToDelete));
    }
  }, [removeResponse]);

  const handleDelete = () => {
    if (taskToDelete) {
      const config = {
        headers: {
          Authorization: token
        }
      };
      const additionalURLParams = [
        {
          name: 'id',
          value: taskToDelete
        }
      ];
      remove(config, additionalURLParams);
    }
  };

  const handleEdit = (id) => {
    navigate(`/tasks/${id}`);
  };

  const renderRows = () => {
    return tasks?.map((task) => (
      <DataTableRow key={task.id}>
        <DataTableItem>{task.title}</DataTableItem>
        <DataTableItem>{task.points}</DataTableItem>
        <DataTableItem>{task.language}</DataTableItem>
        <DataTableItem>{!task.mutable ? 'Yes' : 'No'}</DataTableItem>
        <DataTableItem align='right'>
          <ActionButtonsContainer>
            <IconButton
              disabled={!task.mutable}
              onClick={() => handleEdit(task.id)}
            >
              <EditIcon color={!task.mutable && theme.colors.StrongGray} />
            </IconButton>
            <IconButton
              onClick={() => {
                setTaskToDelete(task.id);
                toggleDeletePopup();
              }}
              disabled={!task.mutable || removeLoading}
            >
              <DeleteIcon
                color={
                  (!task.mutable || removeLoading) && theme.colors.StrongGray
                }
              />
            </IconButton>
          </ActionButtonsContainer>
        </DataTableItem>
      </DataTableRow>
    ));
  };

  return (
    <Container topBar={topBar}>
      <DataTableContainer>
        <DataTableToolbar>
          <OutlinedButton
            value='Create task'
            color={theme.colors.BlazeBlue}
            onClick={() => navigate('/tasks/new')}
          />
        </DataTableToolbar>
        <DataTable
          loading={findLoading}
          noDataVisible={!tasks || tasks?.length === 0}
        >
          <DataTableHeader>
            <DataTableRow
              borderSize='0px'
              hovarable={false}
            >
              <DataTableItem>Title</DataTableItem>
              <DataTableItem>Points</DataTableItem>
              <DataTableItem>Language</DataTableItem>
              <DataTableItem>Used in a tournament</DataTableItem>
              <DataTableItem
                width='100px'
                align='right'
              ></DataTableItem>
            </DataTableRow>
          </DataTableHeader>
          <DataTableBody>{renderRows()}</DataTableBody>
        </DataTable>
        <Text>{Pluralize(tasks?.length || 0, 'item')}</Text>
      </DataTableContainer>
      {deletePopupOpen && (
        <Popup
          title='Confirm'
          message={`You are about to delete a task. Do you wish to continue?`}
          closeButtonColor={theme.colors.BlazeBlue}
          onClose={toggleDeletePopup}
          buttons={[
            {
              name: 'Confirm',
              color: theme.colors.BlazeBlue,
              onClick: handleDelete,
              loading: removeLoading
            }
          ]}
        />
      )}
    </Container>
  );
};

export default TaskList;
