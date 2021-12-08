import logo from './logo.svg';
import './App.css';
import React, { useState, Suspense } from 'react';

// const SplitMe = React.lazy(() => import('./SplitMe'));

import loadable from '@loadable/component';
const SplitMe = loadable(() => import('./SplitMe'), {
  fallback: <div>loading...</div>
});

function App() {
  // const [SplitMe, setSplitMe] = useState(null);
  const [visible, setVisible] = useState(false);

  // const onClick = () => {
  //   import('./notify').then(result => result.default());
  // }

  // const handleClick = async () => {
    // const loadedModule = await import('./SplitMe');

    // setSplitMe(() => loadedModule.default);
  // }

  const handleClick = async () => {
    setVisible(true);
  }

  const onMouseOver = () => {
    SplitMe.preload();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {/*<p onClick={onClick}>*/}
        {/*  Hello React!*/}
        {/*</p>*/}

        {/*<p onClick={handleClick}>*/}
        {/*  Hello React!*/}
        {/*</p>*/}
        {/*{SplitMe && <SplitMe/>}*/}

        <p onClick={handleClick} onMouseOver={onMouseOver}>
          Hello React!
        </p>
        <Suspense fallback={<div>loading...</div>}>
          {visible && <SplitMe/>}
        </Suspense>


        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
