import axios from 'axios';

// user should only be email and password
const login = (user) => {
  return axios.post(`${process.env.REACT_APP_API_DOMAIN}/auth/login`, user).then((response) => {
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem('token');
};

const loginServices = {
  login,
  logout
};
export default loginServices;
