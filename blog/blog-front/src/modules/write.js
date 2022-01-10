import { createActions, handleActions } from "redux-actions";
import produce from 'immer';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as postsAPI from '../lib/api/posts';

const initialState = {
  title: '',
  body: '',
  tags: []
};

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] = createRequestActionTypes('write/WRITE_POST');

export const { write: {changeField, initialize, writePost}} = createActions({
  [INITIALIZE]: () => {},
  [CHANGE_FIELD]: ({key, value}) => ({key, value}),
  [WRITE_POST]: ({title, body, tags}) => ({title, body, tags})
});

const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
}

const write = handleActions({
  [INITIALIZE]: state => initialState,
  [CHANGE_FIELD]: (state, {payload: {key, value}}) => produce(state, draft => {
    draft[key] = value;
  }),
  [WRITE_POST]: state => produce(state, draft => {
    draft.post = null;
    draft.postError = null;
  }),
  [WRITE_POST_SUCCESS]: (state, {payload: post}) => produce(state, draft => {
    draft.post = post;
  }),
  [WRITE_POST_FAILURE]: (state, {payload: postError}) => produce(state, draft => {
    draft.postError = postError;
  })
}, initialState);

export default write;