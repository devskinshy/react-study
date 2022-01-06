import { createActions, handleActions } from "redux-actions";
import produce from 'immer';

const initialState = {
  title: '',
  body: '',
  tags: []
};

const INITIALIZE = 'write/INITIALIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';

export const { write: {initialize, }} = createActions({
  [INITIALIZE]: () => {},
  [CHANGE_FIELD]: ({key, value}) => ({key, value})
});

const write = handleActions({
  [INITIALIZE]: state => produce(state, draft => {
    draft = initialState
  }),
  [CHANGE_FIELD]: (state, {payload: {key, value}}) => produce(state, draft => {
    draft[key] = value;
  })
}, initialState);

export default write;