import React, { useContext, useEffect, useState } from 'react';
import { useFind } from '../../utils';
import UserProfile from './user-profile';
import { DataContext } from '../../utils';
import jwtDecode from 'jwt-decode';

function Profile() {
  const token = localStorage.getItem('token');
  let username = null;
  if (token) {
    username = jwtDecode(token).username;
  }
  const dataContext = useContext(DataContext);
  const [user, setUser] = useState(null);

  const { response, find } = useFind(`${dataContext.API}/user/${username}`);
  useEffect(() => {
    find({
      headers: {
        Authorization: token
      }
    });
  }, []);

  useEffect(() => {
    if (response?.data) {
      setUser(response.data);
    }
  }, [response]);

  return <UserProfile user={user} />;
}

export default Profile;
