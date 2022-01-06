import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const AuthFormBlock = styled.div`
  h3 {
    margin: 0 0 1rem;
    color: ${palette.gray[8]};
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const ButtonWidthMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;

const textMap = {
  login: 'Login',
  register: 'Register'
}

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const AuthForm = ({type, form, onChange, onSubmit, error}) => {
  const text = textMap[type];

  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        <StyledInput autoComplete={'username'} name={'username'} placeholder={'id'} onChange={onChange} value={form.username}/>
        <StyledInput autoComplete={'password'} name={'password'} placeholder={'password'} type={'password'} onChange={onChange} value={form.password}/>
        {type === 'register' && (
          <StyledInput autoComplete={'new-password'} name={'passwordConfirm'} placeholder={'password confirm'} type={'password'} onChange={onChange} value={form.passwordConfirm}/>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ButtonWidthMarginTop cyan fullWidth>{text}</ButtonWidthMarginTop>
      </form>
      <Footer>
        {
          type === 'login'
            ? <Link to={'/register'}>{textMap['register']}</Link>
            : <Link to={'/login'}>{textMap['login']}</Link>
        }
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;