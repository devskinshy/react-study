import { createActions, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import produce from "immer";

const initialState = {
  post: null,
  error: null
}

const [READ_POST, READ_POST_SUCCESS, READ_POST_FAILURE] = createRequestActionTypes('post/READ_POST');
const UNLOAD_POST = 'post/UNLOAD_POST';

export const {post: {readPost, unloadPost}} = createActions({
  [READ_POST] : id => id,
  [UNLOAD_POST] : () => {}
});

const readPostSaga = createRequestSaga(READ_POST, postsAPI.readPost);
export function* postSaga() {
  yield takeLatest(READ_POST, readPostSaga);
};

const post = handleActions({
  [READ_POST_SUCCESS]: (state, {payload: post}) => produce(state, draft => {
    draft.post = post;
  }),
  [READ_POST_FAILURE]: (state, {payload: error}) => produce(state, draft => {
    draft.error = error;
  }),
  [UNLOAD_POST]: state => initialState
}, initialState);

export default post;