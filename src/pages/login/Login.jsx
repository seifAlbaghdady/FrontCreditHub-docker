import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import { useForm } from 'react-hook-form';
import loginServices from './login.services';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import BounceLoader from "react-spinners/BounceLoader";

const Login = ({ location }) => {

  // TODO: remove this and make a separate component for the loader
  const loaderStyle = { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };


  const loggedIn = localStorage.getItem('token') ? true : false;
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const { register, handleSubmit } = useForm({
    mode: 'onTouched'
  });
  useEffect(() => {
    if (searchParams.get('emailConfirmed') === 'true') {
      setMessage('Your email has been confirmed, you can login now.');
      setSuccessful(true);
    }
  }, [searchParams]);
  const onSubmit = (data) => {
    setLoading(true);
    setMessage('');
    setSuccessful(false);
    loginServices.login(data).then(
      (response) => {
        setLoading(false);
        setSuccessful(true);
        setMessage('Successful');
        window.location.reload();
      },
      (error) => {
        setLoading(false);
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        console.log(resMessage);
        setSuccessful(false);
      }
    );
  };
  if (loggedIn) return <Navigate to="/" />;
  return (
    <section id="login">
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="email" placeholder="Email" {...register('email')} />
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          <div>
            <Link to="/register">
              Create an account
            </Link>
          </div>
          <div>
            <Link to="/forget-password">
              Forgot your password?
            </Link>
          </div>

          <button type="submit">
            Login
          </button>
        </form>
        {message && (
          <div>
            <div role="alert">
              {message}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Login;
