import {all, select, call, put, takeEvery} from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actionCreators from '../allCreators';

// const drupalSettings = window.drupalSettings || {};

export function* watchGetProperty() {
  yield takeEvery(actionTypes.GET_PROPERTY, getProperty);
}

// Go get drupal data, on success, run success action
// TODO: Move the "initial state" to PropertyAnalysisBase.jsx and use this
// for getting drupal data only (updating state)
// See: https://medium.com/the-web-tub/managing-your-react-state-with-redux-affab72de4b1
export function* getProperty(action) {
  // console.log('[analysisSagas.jsx] getProperty', drupalSettings);
  try {
    const response = yield call(
      fetch,
      `/jsonapi/node/property/${action.payload}`,
    );
    const results = yield call([response, response.json]);
    // console.log('[sagas.jsx] getProperty', results);

    yield put(actionCreators.getPropertySuccess(results.data));
    yield put(actionCreators.initAnalysis(results.data));
  }
  catch (e) {
    console.log(e);
    // yield put(actionCreators.getPropertyFailure({error: error}))
    return null;
  }
}

export function* watchGetPropertySuccess() {
  // yield takeEvery(actionTypes.GET_PROPERTY_SUCCESS, initializeAnalysis);
}

export function* watchSetProperty() {
  // yield takeEvery(actionTypes.SET_PROPERTY, initializeAnalysis);
}

export function* initializeAnalysis() {
  // yield put(actionCreators.initAnalysis());
}
