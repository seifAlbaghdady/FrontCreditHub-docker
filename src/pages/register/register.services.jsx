import axios from 'axios';

export const addUser = (user) =>
  axios.post(`${process.env.REACT_APP_API_DOMAIN}/auth/register`, user).then((response) => {
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  });
