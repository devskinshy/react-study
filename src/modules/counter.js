import { combineActions, createActions, handleActions } from 'redux-actions';
import {delay, put, select, takeLatest, throttle} from 'redux-saga/effects';
import produce from 'immer';

const initialState = {
  number: 0
};

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

export const {counter: {increase, decrease, increaseAsync, decreaseAsync}} = createActions({
  [INCREASE]: () => 1,
  [DECREASE]: () => -1,
  [INCREASE_ASYNC]: () => {},
  [DECREASE_ASYNC]: () => {}
})

// export const increaseAsync = () => dispatch => {
//   setTimeout(() => {
//     dispatch(increase())
//   }, 1000);
// }
//
// export const decreaseAsync = () => dispatch => {
//   setTimeout(() => {
//     dispatch(decrease())
//   }, 1000)
// }

function* increaseSaga() {
  yield delay(1000);
  yield put(increase());
  const { number } = yield select(state => state.counter);
  console.log(`현재 값은 ${number}입니다.`);
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

export function* counterSaga() {
  // yield takeEvery(INCREASE_ASYNC, increaseSaga);
  yield throttle(3000, INCREASE_ASYNC, increaseSaga);
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

const counter = handleActions(
  {
    [combineActions(increase, decrease)] : (state, { payload }) => produce(state, draft => {
      draft.number += payload;
    }),
  },
  initialState
)

export default counter;
