import { createAction } from 'redux-actions';
import { finishLoading, startLoading } from '../modules/loading';

const createRequestThunk = (type, request) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  const requestAction = createAction(type);
  const successAction = createAction(SUCCESS, data => data);
  const failureAction = createAction(FAILURE, e => e)

  return params => async dispatch => {
    dispatch(requestAction());
    dispatch(startLoading(type));
    try {
      const { data } = await request(params);
      dispatch(successAction(data));
    } catch (e) {
      dispatch(failureAction(e));
      throw e;
    } finally {
      dispatch(finishLoading(type));
    }
  }
}

export default createRequestThunk;
