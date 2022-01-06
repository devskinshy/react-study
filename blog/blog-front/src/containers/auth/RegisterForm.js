import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user
  }));
  const navigate = useNavigate();


  const onChange = e => {
    const {value, name} = e.target;
    dispatch(changeField({
      form: 'register',
      key: name,
      value
    }));
  }

  const onSubmit = e => {
    e.preventDefault();
    const {username, password, passwordConfirm} = form;

    if([username, password, passwordConfirm].includes('')) {
      setError('plz set all input');
      return;
    }
    if(password !== passwordConfirm) {
      console.log('not same password');
      setError('not same password');
      dispatch(changeField({form: 'register', key: 'password', value: ''}))
      dispatch(changeField({form: 'register', key: 'passwordConfirm', value: ''}))
      return;
    }

    dispatch(register({ username, password }));
  }

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if(authError) {
      if(authError.response.status === 409) {
        setError('already used')
        return;
      }

      setError('register error');
      return;
    }
    if(auth) {
      console.log('register!!!');
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
  }, [user, navigate]);

  return (
    <AuthForm
      type={'register'}
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default RegisterForm;