import React, { useContext, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
// import { useTheme } from 'styled-components';
import {
  DataTable,
  DataTableBody,
  DataTableContainer,
  DataTableHeader,
  DataTableItem,
  DataTableRow,
  Form,
  TextInput
} from '../../components';
import { useNavigate } from 'react-router-dom';
import { DataContext, Pluralize, useFind } from '../../utils';
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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

const InfoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;
`;

const TournamentHistoryContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;
`;

const Text = styled.p`
  color: ${(props) => props.theme.colors.White};
  ${(props) =>
    props.fontSize
      ? css`
          font-size: ${props.fontSize};
        `
      : null};
  font-weight: bold;
`;

const UserProfile = ({ user }) => {
  // const theme = useTheme();
  const navigate = useNavigate();
  const dataContext = useContext(DataContext);
  const [tournaments, setTournaments] = useState(null);
  const { response, loading, find } = useFind(
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
      setTournaments(response.data);
    }
  }, [response]);

  const renderTournamentsRows = () => {
    return tournaments?.map((tournament) => (
      <DataTableRow
        key={tournament.id}
        clickable={true}
        onClick={() => navigate(`/tournament/${tournament.id}`)}
      >
        <DataTableItem>{tournament.name}</DataTableItem>
        <DataTableItem>{tournament.startDate}</DataTableItem>
        <DataTableItem>{tournament.endDate}</DataTableItem>
        <DataTableItem>{tournament.difficulty}</DataTableItem>
        <DataTableItem>{tournament.creatorUser?.username}</DataTableItem>
        <DataTableItem>{tournament.status}</DataTableItem>
      </DataTableRow>
    ));
  };

  return (
    <Container>
      <PageContainer>
        <InfoContainer>
          <Container>
            <Form
              title={`${user?.name} ${user?.surname}`}
              onSubmit={() => navigate('/profile/edit', { state: user })}
              submitButtonTitle='Edit'
              showCancelButton={false}
            >
              {user?.username ? (
                <TextInput
                  label='Username'
                  name='username'
                  size='lg'
                  value={user?.username}
                  disabled
                />
              ) : null}
              {user?.email ? (
                <TextInput
                  label='Email'
                  name='email'
                  size='lg'
                  value={user?.email}
                  disabled
                />
              ) : null}
              {user?.phoneNumber ? (
                <TextInput
                  label='Phone'
                  name='phoneNumber'
                  size='lg'
                  value={user?.phoneNumber}
                  disabled
                />
              ) : null}
              {user?.role === dataContext.ROLES.SPONSOR ? (
                <TextInput
                  label='Role'
                  name='role'
                  size='lg'
                  value='Sponsor'
                  disabled
                />
              ) : user?.role === dataContext.ROLES.USER ? (
                <TextInput
                  label='Role'
                  name='role'
                  size='lg'
                  value='Programmer'
                  disabled
                />
              ) : user?.role === dataContext.ROLES.USER ? (
                <TextInput
                  label='Role'
                  name='role'
                  size='lg'
                  value='Admin'
                  disabled
                />
              ) : null}
              {user?.role === dataContext.ROLES.USER && (
                <>
                  <TextInput
                    label='Points'
                    name='points'
                    size='lg'
                    value={user?.points}
                    disabled
                  />
                  <TextInput
                    label='Level'
                    name='level'
                    size='lg'
                    value={user?.level}
                    disabled
                  />
                </>
              )}
            </Form>
          </Container>
        </InfoContainer>
        <TournamentHistoryContainer>
          <Text fontSize='26px'>Tournament History</Text>
          <DataTableContainer>
            <DataTable
              loading={loading}
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
                </DataTableRow>
              </DataTableHeader>
              <DataTableBody>{renderTournamentsRows()}</DataTableBody>
            </DataTable>
            <Text>{Pluralize(tournaments?.length || 0, 'item')}</Text>
          </DataTableContainer>
        </TournamentHistoryContainer>
      </PageContainer>
    </Container>
  );
};

export default UserProfile;
