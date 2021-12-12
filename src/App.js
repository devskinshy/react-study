import React from 'react';
import Menu from './components/Menu';
import { Routes, Route } from 'react-router-dom';
import RedPage from './pages/RedPage';
import BluePage from './pages/BluePage';

const App = () => {
  return (
    <div>
      <Menu/>
      <hr/>
      <Routes>
        <Route path={'/red'} element={<RedPage/>}/>
        <Route path={'/blue'} element={<BluePage/>}/>
      </Routes>
    </div>
  );
};

export default App;
