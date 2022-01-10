import { createActions, handleActions } from "redux-actions";
import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';
import produce from "immer";

const initialState = {
  posts: null,
  error: null,
  lastPage: 1
}

const [LIST_POSTS, LIST_POSTS_SUCCESS, LIST_POSTS_FAILURE] = createRequestActionTypes('posts/LIST_POSTS');

export const {posts: {listPosts}} = createActions({
  [LIST_POSTS]: ({tag, username, page}) => ({tag, username, page})
});

const listPostsSaga = createRequestSaga(LIST_POSTS, postsAPI.listPosts);
export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
}

const posts = handleActions({
  [LIST_POSTS_SUCCESS] : (state, {payload: posts, meta: response}) => produce(state, draft => {
    draft.posts = posts;
    draft.lastPage = parseInt(response.headers['last-page'], 10);
  }),
  [LIST_POSTS_FAILURE] : (state, {payload: error}) => produce(state, draft => {
    draft.error = error;
  })
}, initialState);

export default posts;