import { useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavigationBar, Snackbar, Theme } from './components';
import {
  Home,
  Login,
  Registration,
  Profile,
  UserInteface,
  Contact,
  EditProfile,
  TaskList,
  TaskForm,
  SolveTask,
  TournamentList,
  Tournament,
  TermsPage,
  TournamentForm
} from './pages';
import { Leaderboard } from './pages/leaderboard';
import { DataContext } from './utils';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  height: 100vh;
`;

const App = () => {
  const dataContext = {
    API: 'http://localhost:8080',
    ROLES: {
      ADMIN: 'ROLE_ADMIN',
      USER: 'ROLE_USER',
      SPONSOR: 'ROLE_SPONSOR'
    },
    TOURNAMENT_STATUS: {
      REGISTRATION: 'Registration',
      STARTED: 'Started',
      ENDED: 'Ended'
    }
  };

  const snackbarRef = useRef(null);
  const [snackbar, setSnackbar] = useState({});

  return (
    <DataContext.Provider value={dataContext}>
      <Theme>
        <Container>
          <Router>
            <NavigationBar
              snackbarRef={snackbarRef}
              setSnackbar={setSnackbar}
            />
            <Routes>
              <Route path='/'>
                <Route
                  index
                  element={<Home />}
                />
                <Route
                  path='login'
                  element={
                    <Login
                      snackbarRef={snackbarRef}
                      setSnackbar={setSnackbar}
                    />
                  }
                />
                <Route
                  path='register'
                  element={
                    <Registration
                      snackbarRef={snackbarRef}
                      setSnackbar={setSnackbar}
                    />
                  }
                />
                <Route
                  path='ui'
                  element={<UserInteface />}
                />
                <Route
                  path='tournaments/:id'
                  element={
                    <Tournament
                      snackbarRef={snackbarRef}
                      setSnackbar={setSnackbar}
                    />
                  }
                />
                <Route
                  path='tournaments'
                  element={<TournamentList />}
                />
                <Route
                  path='profile'
                  element={<Profile />}
                />
                <Route
                  path='terms_conditions'
                  element={<TermsPage />}
                />
                <Route
                  path='contact_us'
                  element={<Contact />}
                />
                <Route
                  path='tournament-form/:id'
                  element={
                    <TournamentForm
                      snackbarRef={snackbarRef}
                      setSnackbar={setSnackbar}
                    />
                  }
                />
                <Route
                  path='profile/edit'
                  element={<EditProfile />}
                />
                <Route
                  path='tasks'
                  element={<TaskList />}
                />
                <Route
                  path='tasks/:id'
                  element={
                    <TaskForm
                      snackbarRef={snackbarRef}
                      setSnackbar={setSnackbar}
                    />
                  }
                />
                <Route
                  path='solve_task/:id'
                  element={
                    <SolveTask
                      snackbarRef={snackbarRef}
                      setSnackbar={setSnackbar}
                    />
                  }
                />
              </Route>
              <Route
                  path='leaderboard'
                  element={<Leaderboard />}
                />
            </Routes>
            <Snackbar
              ref={snackbarRef}
              snackbar={snackbar}
            />
          </Router>
        </Container>
      </Theme>
    </DataContext.Provider>
  );
};

export default App;
