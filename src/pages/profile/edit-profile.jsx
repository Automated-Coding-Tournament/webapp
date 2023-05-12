import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Form, TextInput } from '../../components';
import { useUpdate, DataContext } from '../../utils';

const Container = styled.div`
  height: calc(100% - ${(props) => props.topBar?.offsetHeight || 0}px);
  background-color: ${(props) => props.theme.colors.StrongGray};
`;

const EditProfile = () => {
  const topBar = document.getElementById('topBar');
  const token = localStorage.getItem('token');
  const location = useLocation();
  const user = location.state;
  const dataContext = useContext(DataContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: {
      value: user?.name,
      errorMessage: ''
    },
    surname: {
      value: user?.surname,
      errorMessage: ''
    },
    email: {
      value: user?.email,
      errorMessage: ''
    },
    phoneNumber: {
      value: user?.phoneNumber,
      errorMessage: ''
    }
  });

  const { response, loading, error, update } = useUpdate(
    `${dataContext.API}/user/edit/${user.username}`
  );

  useEffect(() => {
    if (response?.status === 200) {
      navigate('/profile');
    }
  }, [response]);

  useEffect(() => {
    if (error?.response?.data?.errors?.length > 0) {
      mapErrors(error.response.data.errors);
    }
  }, [error]);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: {
        value: e.target.value,
        errorMessage: ''
      }
    });
  };

  const checkForErrors = () => {
    let hasErrors = false;
    const validationErrors = [];

    // Check name
    if (credentials.name?.value === '') {
      validationErrors.push({
        propertyName: 'name',
        errorMessage: 'Required'
      });
    }

    // Check surname
    if (credentials.surname?.value === '') {
      validationErrors.push({
        propertyName: 'surname',
        errorMessage: 'Required'
      });
    }

    // Check email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (credentials.email?.value === '') {
      validationErrors.push({
        propertyName: 'email',
        errorMessage: 'Required'
      });
    } else if (!emailRegex.test(credentials.email.value)) {
      validationErrors.push({
        propertyName: 'email',
        errorMessage: 'Please enter a valid email address'
      });
    }

    if (validationErrors.length > 0) {
      hasErrors = true;
      mapErrors(validationErrors);
    }

    if (error?.response?.data?.errors?.length > 0) {
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
      const request = {
        name: credentials.name.value,
        surname: credentials.surname.value,
        email: credentials.email.value,
        phoneNumber: credentials.phoneNumber.value
      };
      const config = {
        headers: {
          Authorization: token
        }
      };
      update(request, config);
    }
  };

  return (
    <Container topBar={topBar}>
      <Form
        title='Edit profile'
        onSubmit={handleSubmit}
        loading={loading}
      >
        <TextInput
          label='Name'
          name='name'
          size='lg'
          value={credentials.name?.value}
          onChange={handleChange}
          required
          errorMessage={credentials.name?.errorMessage}
        />
        <TextInput
          label='Surname'
          name='surname'
          size='lg'
          value={credentials.surname?.value}
          onChange={handleChange}
          required
          errorMessage={credentials.surname?.errorMessage}
        />
        <TextInput
          label='Email'
          name='email'
          size='lg'
          value={credentials.email?.value}
          onChange={handleChange}
          required
          errorMessage={credentials.email?.errorMessage}
        />
        <TextInput
          label='Phone Number'
          name='phoneNumber'
          size='lg'
          value={credentials.phoneNumber?.value}
          onChange={handleChange}
          errorMessage={credentials.phoneNumber?.errorMessage}
        />
      </Form>
    </Container>
  );
};

export default EditProfile;
