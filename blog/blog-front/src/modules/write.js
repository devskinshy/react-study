import { createActions, handleActions } from "redux-actions";
import produce from 'immer';
import {takeLatest} from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as postsAPI from '../lib/api/posts';

const initialState = {
  title: '',
  body: '',
  tags: [],
  post: null,
  postError: null,
  originalPostId: null
};

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] = createRequestActionTypes('write/WRITE_POST');
const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] = createRequestActionTypes('write/UPDATE_POST');

export const { write: {initialize, changeField, setOriginalPost, writePost, updatePost}} = createActions({
  [INITIALIZE]: () => {},
  [CHANGE_FIELD]: ({key, value}) => ({key, value}),
  [SET_ORIGINAL_POST]: post => post,
  [WRITE_POST]: ({title, body, tags}) => ({title, body, tags}),
  [UPDATE_POST]: ({id, title, body, tags}) => ({id, title, body, tags})
});

const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postsAPI.updatePost);
export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
}

const write = handleActions({
  [INITIALIZE]: state => initialState,
  [CHANGE_FIELD]: (state, {payload: {key, value}}) => produce(state, draft => {
    draft[key] = value;
  }),
  [SET_ORIGINAL_POST]: (state, {payload: post}) => produce(state, draft => {
    draft.originalPostId = post._id;
    draft.title = post.title;
    draft.body = post.body;
    draft.tags = post.tags;
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
  }),
  [UPDATE_POST_SUCCESS]: (state, {payload: post}) => produce(state, draft => {
    draft.post = post;
  }),
  [UPDATE_POST_FAILURE]: (state, {payload: postError}) => produce(state, draft => {
    draft.postError = postError;
  })
}, initialState);

export default write;
