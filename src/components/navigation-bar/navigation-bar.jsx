import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { IconButton, MenuIcon, OutlinedButton } from '..';
import { useTheme } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { DataContext } from '../../utils';

const TopBar = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 52px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.Black};
  background: linear-gradient(
    to bottom,
    ${(props) => props.theme.colors.Black} 24%,
    ${(props) => `${props.theme.colors.Black}E5`} 64%,
    ${(props) => `${props.theme.colors.Black}CC`} 100%,
    ${(props) => `${props.theme.colors.Black}CC`} 100%
  );
  border-bottom: 3px solid transparent;
  border-image: linear-gradient(
      to right,
      ${(props) => `${props.theme.colors.Black}4C`} 0%,
      ${(props) => props.theme.colors.BlazeBlue} 50%,
      ${(props) => `${props.theme.colors.Black}4C`} 100%
    )
    2;
`;

const SideBar = styled.div`
  position: fixed;
  top: 52px;
  height: calc(100% - 54px);
  width: 300px;

  display: flex;
  flex-direction: column;
  padding: 8px;

  background-color: ${(props) => props.theme.colors.Black};
  background: linear-gradient(
    to bottom,
    ${(props) => props.theme.colors.Black} 24%,
    ${(props) => `${props.theme.colors.Black}E5`} 64%,
    ${(props) => `${props.theme.colors.Black}CC`} 100%,
    ${(props) => `${props.theme.colors.Black}CC`} 100%
  );
  border-bottom: 3px solid transparent;
  border-image: linear-gradient(
      to right,
      ${(props) => `${props.theme.colors.Black}4C`} 0%,
      ${(props) => props.theme.colors.BlazeBlue} 50%,
      ${(props) => `${props.theme.colors.Black}4C`} 100%
    )
    2;

  transition: all 0.25s ease-out;
  transform: translateX(${(props) => `${props.isOpen ? 0 : -316}px`});
  z-index: 2;
`;

const MenuButtonContainer = styled.div`
  width='300px'
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 8px;

`;

const NavigationButtonsContainer = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  padding-right: 8px;
  width='300px'
`;

const SidebarButtonContainer = styled.div`
  border: 1px solid ${(props) => props.theme.colors.White};
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-3px);
    background-color: ${(props) => props.theme.colors.White}4D;
  }
`;

const Text = styled.span`
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  font-family: ${(props) => props.theme.fonts.Default};
  color: ${(props) => props.theme.colors.White};
`;

const NavigationBar = (props) => {
  const token = localStorage.getItem('token');
  let role = null;
  if (token) {
    role = jwtDecode(token).authorities;
  }
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dataContext = useContext(DataContext);

  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);
  const toggleSideBar = () => {
    setSideBarIsOpen(!sideBarIsOpen);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    props.setSnackbar({
      message: 'See you soon!'
    });
    props.snackbarRef.current.show();
    setSideBarIsOpen(false);
    navigate('/');
  };

  return (
    <>
      <TopBar id='topBar'>
        <MenuButtonContainer>
          <IconButton onClick={() => token && toggleSideBar()}>
            <MenuIcon />
          </IconButton>
        </MenuButtonContainer>
        <NavigationButtonsContainer>
          {!token && location.pathname === '/' && (
            <>
              <OutlinedButton
                value='Sign Up'
                color={theme.colors.PurpleBlue}
                onClick={() => navigate('/register')}
              />
              <OutlinedButton
                value='Sign In'
                color={theme.colors.PurpleBlue}
                onClick={() => navigate('/login')}
              />
            </>
          )}
          {location.pathname !== '/' && (
            <OutlinedButton
              value='Home'
              color={theme.colors.PurpleBlue}
              onClick={() => navigate('/')}
            />
          )}
          {token && (
            <>
              <OutlinedButton
                value='Profile'
                color={theme.colors.PurpleBlue}
                onClick={() => navigate('/profile')}
              />
              <OutlinedButton
                value='Log Out'
                color={theme.colors.PurpleBlue}
                onClick={logOut}
              />
            </>
          )}
        </NavigationButtonsContainer>
      </TopBar>
      <SideBar isOpen={sideBarIsOpen}>
        <SidebarButtonContainer
          onClick={() => {
            toggleSideBar();
            navigate('/tournaments');
          }}
        >
          <Text>Tournaments</Text>
        </SidebarButtonContainer>
        {role && role !== dataContext.ROLES.USER && (
          <SidebarButtonContainer
            onClick={() => {
              toggleSideBar();
              navigate('/tasks');
            }}
          >
            <Text>Tasks</Text>
          </SidebarButtonContainer>
        )}
      </SideBar>
    </>
  );
};

export default NavigationBar;
