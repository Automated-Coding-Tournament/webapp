import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { IconButton, LogoHorizontal, MenuIcon, OutlinedButton } from '..';
import { useTheme } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { DataContext } from '../../utils';

const TopBar = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  height: 7%;
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
  z-index: 2;
`;

const SideBar = styled.div`
  position: fixed;
  top: 7%;
  height: 92.7%;
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
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 8px;
  width: 30%;
`;

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 8px;
`;

const NavigationButtonsContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 8px;
  width: 30%;
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
      <TopBar>
        <MenuButtonContainer>
          <IconButton onClick={() => token && toggleSideBar()}>
            <MenuIcon />
          </IconButton>
        </MenuButtonContainer>
        <LogoContainer>
          <LogoHorizontal height='85%' />
        </LogoContainer>
        <NavigationButtonsContainer>
          {!token && location.pathname === '/' && (
            <>
              {location.pathname !== '/register' && (
                <OutlinedButton
                  value='Sign Up'
                  color={theme.colors.PurpleBlue}
                  onClick={() => navigate('/register')}
                />
              )}
              {location.pathname !== '/login' && (
                <OutlinedButton
                  value='Sign In'
                  color={theme.colors.PurpleBlue}
                  onClick={() => navigate('/login')}
                />
              )}
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
              {location.pathname !== '/profile' && (
                <OutlinedButton
                  value='Profile'
                  color={theme.colors.PurpleBlue}
                  onClick={() => navigate('/profile')}
                />
              )}
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
            navigate('/leaderboard');
          }}
        >
          <Text>Leaderboard</Text>
        </SidebarButtonContainer>
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
