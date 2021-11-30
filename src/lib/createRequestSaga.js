import { call, put } from 'redux-saga/effects';
import {startLoading, finishLoading} from '../modules/loading';
import { createAction } from 'redux-actions';

const createRequestSata = (type, request) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  const successAction = createAction(SUCCESS, data => data);
  const failureAction = createAction(FAILURE, e => e)

  return function* ({ payload }) {
    yield put(startLoading(type));

    try {
      const { data } = yield call(request, payload);
      yield put(successAction(data));
    } catch (e) {
      yield put(failureAction(e));
    }

    yield put(finishLoading(type));
  }
}

export default createRequestSata;
