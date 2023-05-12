import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { Form, PasswordInput, TextInput } from '../../components';
import { useSave, DataContext } from '../../utils';

const Container = styled.div`
  height: calc(100% - ${(props) => props.topBar?.offsetHeight || 0}px);
  background-color: ${(props) => props.theme.colors.StrongGray};
`;

const Login = (props) => {
  const topBar = document.getElementById('topBar');
  const dataContext = useContext(DataContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [credentials, setCredentials] = useState({
    username: {
      value: '',
      errorMessage: ''
    },
    password: {
      value: '',
      errorMessage: ''
    }
  });

  const { response, loading, error, save, clearError } = useSave(
    `${dataContext.API}/login`
  );

  useEffect(() => {
    if (response?.status === 200 && response?.headers?.authorization) {
      localStorage.setItem('token', response.headers.authorization);

      props.setSnackbar({
        color: theme.colors.DarkGreen,
        message: 'Login successful!'
      });
      props.snackbarRef.current.show();

      navigate('/');
    }
  }, [response]);

  useEffect(() => {
    if (error?.response?.status === 401) {
      setFormErrorMessage('Username or password is incorrect');
    } else {
      setFormErrorMessage(' ');
    }
  }, [error]);

  const handleChange = (e) => {
    setFormErrorMessage('');
    setCredentials({
      ...credentials,
      [e.target.name]: {
        value: e.target.value,
        errorMessage: ''
      }
    });

    if (error) {
      clearError();
    }
  };

  const checkForErrors = () => {
    let hasErrors = false;
    const validationErrors = [];

    // Check username
    if (credentials.username?.value === '') {
      validationErrors.push({
        propertyName: 'username',
        errorMessage: 'Required'
      });
    }

    // Check password
    if (credentials.password?.value === '') {
      validationErrors.push({
        propertyName: 'password',
        errorMessage: 'Required'
      });
    }

    if (validationErrors.length > 0) {
      hasErrors = true;
      mapErrors(validationErrors);
    }

    if (formErrorMessage) {
      hasErrors = true;
    }

    return hasErrors;
  };

  const mapErrors = (array) => {
    let updatedCredentials = { ...credentials };

    array.forEach((x) => {
      updatedCredentials = {
        ...updatedCredentials,
        [x.propertyName]: {
          ...updatedCredentials[x.propertyName],
          errorMessage: x.errorMessage
        }
      };
    });

    setCredentials(updatedCredentials);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = checkForErrors();

    if (!hasErrors) {
      save(null, {
        headers: {
          Authorization:
            'Basic ' +
            btoa(
              credentials.username?.value + ':' + credentials.password?.value
            )
        }
      });
    }
  };

  return (
    <Container topBar={topBar}>
      <Form
        title='Login'
        onSubmit={handleSubmit}
        loading={loading}
        errorMessage={formErrorMessage}
      >
        <TextInput
          label='Username'
          name='username'
          size='lg'
          value={credentials.username?.value}
          onChange={handleChange}
          placeholder='Username'
          required
          errorMessage={credentials.username?.errorMessage}
        />
        <PasswordInput
          label='Password'
          name='password'
          size='lg'
          value={credentials.password?.value}
          onChange={handleChange}
          placeholder='Password'
          required
          errorMessage={credentials.password?.errorMessage}
        />
      </Form>
    </Container>
  );
};

export default Login;
