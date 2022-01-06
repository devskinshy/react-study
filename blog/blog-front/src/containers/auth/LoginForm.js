import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { useNavigate } from 'react-router-dom';
import { check } from '../../modules/user';

const LoginForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user
  }));
  const navigate = useNavigate();

  const onChange = e => {
    const {value, name} = e.target;
    dispatch(changeField({
      form: 'login',
      key: name,
      value
    }));
  }

  const onSubmit = e => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  }

  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if(authError) {
      console.log('error!!!');
      console.log(authError);
      setError('login error!!!');
      return;
    }
    if(auth) {
      console.log('login!!!');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if(user) {
      console.log('check API success!!!');
      console.log(user);
      navigate('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [user]);

  return (
    <AuthForm
      type={'login'}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;