import React from 'react';
import styled from 'styled-components';
import { Form } from '../../components';

const Container = styled.div`
  height: calc(100% - ${(props) => props.topBar?.offsetHeight || 0}px);
  background-color: ${(props) => props.theme.colors.StrongGray};
`;

const BigText = styled.h1`
  text-align: center;
  font-family: ${(props) => props.theme.fonts.Default};
  color: ${(props) => props.theme.colors.White};
  margin: auto;
`;

const SmallText = styled.div`
  text-align: center;
  font-size: 1.2rem;
  font-family: ${(props) => props.theme.fonts.Default};
  color: ${(props) => props.theme.colors.White};
  margin: auto;
`;

const Table = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style-type: none;
  padding: 0px;
`;

const Row = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

function Contact() {
  const topBar = document.getElementById('topBar');
  return (
    <Container topBar={topBar}>
      <Form
        showSubmitButton={false}
        showCancelButton={false}
      >
        <BigText>Contact Us</BigText>
        <SmallText>
          <p>If you have any questions or concerns, you can reach us by:</p>
          <Table>
            <Row>Email: contact@company.com</Row>
            <li>Phone: 555-555-5555</li>
            <li>Address: 123 Main St, Anytown USA</li>
          </Table>
        </SmallText>
      </Form>
    </Container>
  );
}

export default Contact;
