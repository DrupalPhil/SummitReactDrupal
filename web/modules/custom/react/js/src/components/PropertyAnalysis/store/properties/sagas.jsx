import {all, select, call, put, takeEvery} from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actionCreators from '../allCreators';

export function* watchGetProperties() {
  // console.log('[sagas.jsx] watchGetProperties');
  yield takeEvery(actionTypes.GET_PROPERTIES, getProperties);
}

export function* getProperties(action) {
  try {
    const response = yield call(
      fetch,
      `/jsonapi/node/property`,
    );
    const results = yield call([response, response.json]);
    // console.log('[sagas.jsx] getProperties', results);

    yield put(actionCreators.getPropertiesSuccess(results));
  }
  catch (e) {
    console.log(e);
    // yield put(actionCreators.getPropertyFailure({error: error}))
    return null;
  }
}

// export function* propertiesSagas() {
//   yield all([
//     watchGetProperties(),
//   ])
// }
