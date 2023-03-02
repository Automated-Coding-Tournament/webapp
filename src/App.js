import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Login from './Login.js';
const NavigationBar = styled.div`
  height: 30px;
  color: black;
  font-weight: bold;
  background-color: purple;
`;

const App = () => {
  return (
    <>
      <NavigationBar>Navigation Bar</NavigationBar>
      <Router>
        <Routes>
          <Route path='/'>
            <Route
              index
              element={<div>ACT Webapp</div>}
            />
            <Route
              path='Login'
              element={<Login  />}
            />
            <Route
              path='register'
              element={<div>Register</div>}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
