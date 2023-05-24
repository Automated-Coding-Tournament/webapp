import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: cover;
  overflow: auto;
  height: 92.7%;
`;

const BigText = styled.h1`
  text-align: center;
  font-family: ${(props) => props.theme.fonts.Default};
  color: ${(props) => props.theme.colors.White};
`;

const SmallText = styled.div`
  text-align: right;
  font-size: 1.2rem;
  font-family: ${(props) => props.theme.fonts.Default};
  color: ${(props) => props.theme.colors.White};
`;

const Table = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: right;
  list-style-type: none;
  padding: 0px;
`;

const Row = styled.li`
  display: flex;
  flex-direction: row;
  align-items: left;
`;

const CuttedRow = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


function Rules() {
  return (
    <Container>
      <BigText>User Account</BigText>
      <SmallText>
        <Table>
          <Row>&#x2022; Each participant must register on the website with a valid email address, creating a unique username.</Row>
          <Row>&#x2022; Each participant may only have one account. Duplicate accounts will result in disqualification.</Row>
          <Row>&#x2022; Participants must not share their account information with others.</Row>
        </Table>
      </SmallText>
      <BigText>Conduct</BigText>
      <SmallText>
        <Table>
          <Row>&#x2022; Participants must treat each other with respect. Bullying, harassment, or inappropriate language will result in disqualification.</Row>
          <Row>&#x2022; Any form of cheating, including but not limited to plagiarism, unauthorized collaboration, use of unauthorized resources</Row>
          <CuttedRow>or manipulation of scores, will result in immediate disqualification and potential banning from future tournaments.</CuttedRow>
        </Table>
      </SmallText>
      <BigText>Participation</BigText>
      <SmallText>
        <Table>
          <Row>&#x2022; To participate in a tournament, you must be registered before the event start time.</Row>
          <Row>&#x2022; Late submissions will not be accepted.</Row>
          <Row>&#x2022; Participants must not disrupt the tournament by spamming or flooding the platform.</Row>
        </Table>
      </SmallText>
      <BigText>Code Submission</BigText>
      <SmallText>
        <Table>
          <Row>&#x2022; Submitted solutions must be your own original work.</Row>
          <Row>&#x2022; Code should be written in the specified programming languages for each tournament.</Row>
          <Row>&#x2022; Participants must submit their solutions within the designated time frame for each task.</Row>
        </Table>
      </SmallText>
      <BigText>Evaluation and Scoring</BigText>
      <SmallText>
        <Table>
          <Row>&#x2022; Submissions will be evaluated based on correctness, efficiency, and coding style.</Row>
          <Row>&#x2022; Participants must follow the problem guidelines in their solutions. Solutions not adhering to the problem guidelines may be disqualified.</Row>
          <Row>&#x2022; Scores will be calculated based on the number of tasks completed correctly.</Row>
        </Table>
      </SmallText>
      <BigText>Privacy</BigText>
      <SmallText>
        <Table>
          <Row>&#x2022; Personal data of participants will be processed only in accordance with the website’s privacy policy.</Row>
          <Row>&#x2022; Participants may not solicit or reveal personal information about other participants.</Row>
        </Table>
      </SmallText>
      <BigText>Disputes</BigText>
      <SmallText>
        <Table>
          <Row>&#x2022; Any disputes about scoring or rule interpretation will be resolved by the website administration. Their decision will be final and binding.</Row>
          <Row>&#x2022; Participants can raise disputes via the designated dispute resolution form on the website.</Row>
        </Table>
      </SmallText>
      <BigText>Modifications</BigText>
      <SmallText>
        <Table>
          <Row>&#x2022; These rules may be modified at any time by the website administration. Participants will be notified of any changes.</Row>
        </Table>
      </SmallText>
    </Container>
  );
}

export default Rules;