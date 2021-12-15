import React from 'react';
import UsersContainer from '../containers/UsersContainer';
import { Routes, Route } from 'react-router-dom';
import UserContainer from '../containers/UserContainer';

const UsersPage = () => {
  return (
    <>
      <UsersContainer/>
      <Routes>
        <Route path={':id'} element={<UserContainer/>}/>
      </Routes>
    </>
  );
};

export default UsersPage;
