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

const Leaderboard = () => {
  const token = localStorage.getItem('token');
  const dataContext = useContext(DataContext);

  const [leaders, setLeaders] = useState(null);

  // TODO: get all leaders, temporari users for test
  const {
    response: findResponse,
    loading: findLoading,
    find
  } = useFind(`${dataContext.API}/user/get/globalLeaderboard`);

  useEffect(() => {
    find({
      headers: {
        Authorization: token
      }
    });
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
        <DataTableItem>{leader.level}</DataTableItem>
        <DataTableItem>{leader.points}</DataTableItem>
        {/*TODO: add participated tournaments count */}
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
              <DataTableItem>Level</DataTableItem>
              <DataTableItem>Points</DataTableItem>
            </DataTableRow>
          </DataTableHeader>
          <DataTableBody>{renderRows()}</DataTableBody>
        </DataTable>
      </DataTableContainer>
    </Container>
  );
};

export default Leaderboard;