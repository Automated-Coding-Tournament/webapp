import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  DataTable,
  DataTableBody,
  DataTableContainer,
  DataTableHeader,
  DataTableItem,
  DataTableRow,
} from '../../components';
import { DataContext, useFind } from '../../utils';
import { useParams } from 'react-router-dom';

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

const TournamentLeaderboard = () => {
  const token = localStorage.getItem('token');
  const dataContext = useContext(DataContext);
  const { id } = useParams();
  const [leaders, setLeaders] = useState(null);

  // TODO: get all leaders, temporari users for test
  const {
    response: findResponse,
    loading: findLoading,
    find
  } = useFind(`${dataContext.API}/tournament/get/participation/leaderboard/${id}`);

  useEffect(() => {
    if (id) {
      find({
        headers: {
          Authorization: token
        }
      });
    }
  }, []);

  useEffect(() => {
    if (findResponse?.data) {
      setLeaders(findResponse.data);
    }
  }, [findResponse]);

  const renderRows = () => {
    return leaders?.map((leader, index) => (
      <DataTableRow
        key={leader.id}
        clickable={false}
      >
        <DataTableItem>{index + 1}</DataTableItem>
        <DataTableItem>{leader.username}</DataTableItem>
        <DataTableItem>{leader.points}</DataTableItem>
        <DataTableItem>{leader.name}</DataTableItem>
        <DataTableItem>{leader.surname}</DataTableItem>
        <DataTableItem>{leader.email}</DataTableItem>
        <DataTableItem>{leader.phoneNumber}</DataTableItem>
      </DataTableRow>
    ));
  };

  return (
    <Container>
      <DataTableContainer>
        <DataTable
          loading={findLoading}
          noDataVisible={!leaders || leaders?.length === 0}
        >
          <DataTableHeader>
            <DataTableRow
              borderSize='0px'
              hovarable={false}
            >
              <DataTableItem>Ranking</DataTableItem>
              <DataTableItem>User Name</DataTableItem>
              <DataTableItem>Points</DataTableItem>
              <DataTableItem>Name</DataTableItem>
              <DataTableItem>Surname</DataTableItem>
              <DataTableItem>Email</DataTableItem>
              <DataTableItem>Phone</DataTableItem>
            </DataTableRow>
          </DataTableHeader>
          <DataTableBody>{renderRows()}</DataTableBody>
        </DataTable>
      </DataTableContainer>
    </Container>
  );
};

export default TournamentLeaderboard;