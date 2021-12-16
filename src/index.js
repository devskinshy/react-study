import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import rootReducer, { rootSaga } from './modules';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { loadableReady } from '@loadable/component';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  window.__PRELOADED_STATE__, // 이 값을 초기상태로 사용함
  applyMiddleware(thunk, sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

const Root = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  )
}

const root = document.getElementById('root');

if(process.env.NODE_ENV === 'production') {
  console.log(1)
  loadableReady(() => {
    ReactDOM.hydrate(<Root />, root);
  })
} else {
  console.log(2)
  ReactDOM.render(<Root />, root);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
