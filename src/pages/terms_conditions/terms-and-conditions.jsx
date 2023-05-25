import React from 'react';
import styled from 'styled-components';

const TermsContainer = styled.div`
  padding: 40px;
  margin: 0 auto;
  max-width: 800px;
  font-size: 16px;
  line-height: 1.5;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  color: ${(props) => props.theme.colors.White};
`;

const Paragraph = styled.p`
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.White};
`;

const TermsPage = () => (
  <TermsContainer>
    <Title>Terms and Conditions</Title>
    <Paragraph>
      Welcome to our website. If you continue to browse and use this website,
      you are agreeing to comply with and be bound by the following terms and
      conditions of use, which together with our privacy policy govern Code
      Clash relationship with you in relation to this website.
    </Paragraph>
    <Title>Terms of Use</Title>
    <Paragraph>
      The content of the pages of this website is for your general information
      and use only. It is subject to change without notice.
    </Paragraph>
    <Title>User Account</Title>
    <Paragraph>
      If you create an account on our website, you are responsible for
      maintaining the security of your account and you are fully responsible for
      all activities that occur under the account.
    </Paragraph>
    <Title>Intellectual Property Rights</Title>
    <Paragraph>
      All intellectual property rights in the website and the material on the
      website are reserved.
    </Paragraph>
    <Title>Limitations of Liability</Title>
    <Paragraph>
      Code Clash will not be liable to you in relation to the contents of, or
      use of, or otherwise in connection with, this website.
    </Paragraph>
    <Title>Governing Law</Title>
    <Paragraph>
      Your use of this website and any dispute arising out of such use of the
      website is subject to the laws of Code Clash.
    </Paragraph>
    <Title>Changes to These Terms and Conditions</Title>
    <Paragraph>
      Code Clash may revise these terms and conditions from time-to-time.
      Revised terms and conditions will apply to the use of this website from
      the date of the publication of the revised terms and conditions on this
      website.
    </Paragraph>
    <Title>Agreement</Title>
    <Paragraph>
      By using this website, you accept these terms and conditions in full. If
      you disagree with these terms and conditions or any part of these terms
      and conditions, you must not use this website.
    </Paragraph>
  </TermsContainer>
);

export default TermsPage;
