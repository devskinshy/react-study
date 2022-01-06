import createRequestSaga, { createRequestActionTypes } from '../lib/createRequestSaga';
import { createActions, handleActions } from 'redux-actions';
import * as authAPI from '../lib/api/auth';
import { call, takeLatest } from 'redux-saga/effects';
import produce from 'immer';

const initialState = {
  user: null,
  checkError: null
};

const TEMP_SET_USER = 'user/TEMP_SET_USER';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes('user/CHECK');
const LOGOUT = 'user/LOGOUT';

export const {user : {tempSetUser, check, logout}} = createActions({
  [TEMP_SET_USER]: user => user,
  [CHECK]: () => {},
  [LOGOUT]: () => {}
});

const checkSaga = createRequestSaga(CHECK, authAPI.check);
const checkFailureSaga = () => {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.log('localStorage is not working');
  }
}
function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    localStorage.removeItem('user');
  } catch (e) {
    console.log(e);
  }
}

export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const user = handleActions({
  [TEMP_SET_USER]: (state,{payload: user}) => produce(state, draft => {
    draft.user = user;
  }),
  [CHECK_SUCCESS]: (state, {payload: user}) => produce(state, draft => {
    draft.user = user;
    draft.checkError = null;
  }),
  [CHECK_FAILURE]: (state, {payload: error}) => produce(state, draft => {
    draft.user = null;
    draft.checkError = error;
  }),
  [LOGOUT]: (state) => produce(state, draft => {
    draft.user = null;
  })
}, initialState);

export default user;

