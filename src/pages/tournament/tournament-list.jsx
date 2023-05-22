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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.colors.StrongGray};
  background-size: cover;
  overflow: auto;
  height: 92.7%;
`;

const Text = styled.p`
  color: ${(props) => props.theme.colors.White};
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const TournamentList = () => {
  const token = localStorage.getItem('token');
  let role = null;
  if (token) {
    role = jwtDecode(token).authorities;
  }
  const dataContext = useContext(DataContext);
  const theme = useTheme();
  const navigate = useNavigate();

  const [tournaments, setTournaments] = useState(null);
  const [tournamentToDelete, setTournamentsToDelete] = useState(null);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);

  const toggleDeletePopup = () => {
    setDeletePopupOpen(!deletePopupOpen);
  };

  const {
    response: findResponse,
    loading: findLoading,
    find
  } = useFind(`${dataContext.API}/tournament/get/all`);

  const {
    response: removeResponse,
    loading: removeLoading,
    remove
  } = useRemove(`${dataContext.API}/tournament/delete/{id}`);

  useEffect(() => {
    find({
      headers: {
        Authorization: token
      }
    });
  }, []);

  useEffect(() => {
    if (findResponse?.data) {
      setTournaments(findResponse.data);
    }
  }, [findResponse]);

  useEffect(() => {
    if (removeResponse?.status === 200) {
      toggleDeletePopup();
      setTournamentsToDelete(null);
      setTournaments(
        tournaments.filter((tournament) => tournament.id !== tournamentToDelete)
      );
    }
  }, [removeResponse]);

  const handleDelete = () => {
    if (tournamentToDelete) {
      const config = {
        headers: {
          Authorization: token
        }
      };
      const additionalURLParams = [
        {
          name: 'id',
          value: tournamentToDelete
        }
      ];
      remove(config, additionalURLParams);
    }
  };

  const handleEdit = (id) => {
    navigate(`/tournaments/${id}`);
  };

  const renderRows = () => {
    return tournaments?.map((tournament) => (
      <DataTableRow
        key={tournament.id}
        clickable={true}
        onClick={() => navigate(`/tournaments/${tournament.id}`)}
      >
        <DataTableItem>{tournament.name}</DataTableItem>
        <DataTableItem>{tournament.startDate}</DataTableItem>
        <DataTableItem>{tournament.endDate}</DataTableItem>
        <DataTableItem>{tournament.difficulty}</DataTableItem>
        <DataTableItem>{tournament.creatorUser?.username}</DataTableItem>
        <DataTableItem>{tournament.status}</DataTableItem>
        {role && role === dataContext.ROLES.USER && (
          <DataTableItem>{tournament.registered ? 'Yes' : 'No'}</DataTableItem>
        )}
        <DataTableItem align='right'>
          {role && role !== dataContext.ROLES.USER && (
            <ActionButtonsContainer>
              <IconButton
                disabled={
                  tournament.status !==
                  dataContext.TOURNAMENT_STATUS.REGISTRATION
                }
                onClick={() => handleEdit(tournament.id)}
              >
                <EditIcon
                  color={!tournament.mutable && theme.colors.StrongGray}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  setTournamentsToDelete(tournament.id);
                  toggleDeletePopup();
                }}
                disabled={
                  tournament.status !==
                    dataContext.TOURNAMENT_STATUS.REGISTRATION || removeLoading
                }
              >
                <DeleteIcon
                  color={
                    (!tournament.mutable || removeLoading) &&
                    theme.colors.StrongGray
                  }
                />
              </IconButton>
            </ActionButtonsContainer>
          )}
        </DataTableItem>
      </DataTableRow>
    ));
  };

  return (
    <Container>
      <DataTableContainer>
        <DataTableToolbar>
          {role && role !== dataContext.ROLES.USER && (
            <OutlinedButton
              value='Create tournament'
              color={theme.colors.BlazeBlue}
              onClick={() => navigate('/tournaments/new')}
            />
          )}
        </DataTableToolbar>
        <DataTable
          loading={findLoading}
          noDataVisible={!tournaments || tournaments?.length === 0}
        >
          <DataTableHeader>
            <DataTableRow
              borderSize='0px'
              hovarable={false}
            >
              <DataTableItem>Title</DataTableItem>
              <DataTableItem>Start date</DataTableItem>
              <DataTableItem>End date</DataTableItem>
              <DataTableItem>Difficulty</DataTableItem>
              <DataTableItem>Organizer</DataTableItem>
              <DataTableItem>Status</DataTableItem>
              {role && role === dataContext.ROLES.USER && (
                <DataTableItem>Registered</DataTableItem>
              )}
              <DataTableItem
                width='100px'
                align='right'
              ></DataTableItem>
            </DataTableRow>
          </DataTableHeader>
          <DataTableBody>{renderRows()}</DataTableBody>
        </DataTable>
        <Text>{Pluralize(tournaments?.length || 0, 'item')}</Text>
      </DataTableContainer>
      {deletePopupOpen && (
        <Popup
          title='Confirm'
          message={`You are about to delete a tournaments. Do you wish to continue?`}
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

export default TournamentList;
