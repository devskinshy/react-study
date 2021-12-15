import React from 'react';
import Menu from './components/Menu';
import { Routes, Route } from 'react-router-dom';
import RedPage from './pages/RedPage';
import BluePage from './pages/BluePage';
import UsersPage from './pages/UsersPage';

const App = () => {
  return (
    <div>
      <Menu/>
      <hr/>
      <Routes>
        <Route path={'/'} element={<div></div>}/>
        <Route path={'red'} element={<RedPage/>}/>
        <Route path={'blue'} element={<BluePage/>}/>
        <Route path={'users/*'} element={<UsersPage/>}/>
      </Routes>
    </div>
  );
};

export default App;
