import { call, put } from 'redux-saga/effects';
import { finishLoading, startLoading } from '../modules/loading';
import { createAction } from 'redux-actions';

export const createRequestActionTypes = type => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return [type, SUCCESS, FAILURE];
}

const createRequestSaga = (type, request) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  const successAction = createAction(SUCCESS, data => data);
  const failureAction = createAction(FAILURE, e => e)

  return function* ({payload}) {
    yield put(startLoading(type));
    try {
      const { data } = yield call(request, payload);
      yield put(successAction(data));
    } catch (e) {
      yield put(failureAction(e))
    }

    yield put(finishLoading(type));
  }
}

export default createRequestSaga;