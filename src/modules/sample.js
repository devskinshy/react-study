import * as api from '../lib/api';
import { createAction, handleActions } from 'redux-actions';
import {takeLatest} from 'redux-saga/effects';
// import createRequestThunk from '../lib/createRequestThunk';
import createRequestSata from '../lib/createRequestSaga';

const initialState = {
  post: null,
  users: null
}

export const GET_POST = 'sample/GET_POST';
export const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
export const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

export const GET_USERS = 'sample/GET_USERS';
export const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

export const getPost = createAction(GET_POST, id => id);
// const getPostSuccess = createAction(GET_POST_SUCCESS, data => data);
// const getPostFailure = createAction(GET_USERS_FAILURE, e => e)

export const getUsers = createAction(GET_USERS);
// const getUsersSuccess = createAction(GET_USERS_SUCCESS, data => data);
// const getUsersFailure = createAction(GET_POST_FAILURE, e => e)

// export const getPost = createRequestThunk(GET_POST, api.getPost);
// export const getUsers = createRequestThunk(GET_USERS, api.getUsers);
export const getPostSaga = createRequestSata(GET_POST, api.getPost);
export const getUsersSaga = createRequestSata(GET_USERS, api.getUsers);

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload
    }),
  },
  initialState
)

export default sample;
