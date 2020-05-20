import {all, select, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import * as actionTypes from './actionTypes';
import * as actionCreators from '../allCreators';



export function* calculateLoanAmount() {
  yield put(actionCreators.calculateLoanAmount());
}

export function* watchLoanAmountDependencies() {
  yield takeEvery(actionTypes.SET_OFFER_PRICE, calculateLoanAmount);
  yield takeEvery(actionTypes.SET_DOWN_PAYMENT, calculateLoanAmount);
}

export function* calculateTotalCashNeeded() {
  yield put(actionCreators.calculateTotalCashNeeded());
}

export function* watchTotalCashNeededDependencies() {
  yield takeEvery(actionTypes.SET_OFFER_PRICE, calculateTotalCashNeeded);
  yield takeEvery(actionTypes.SET_DOWN_PAYMENT, calculateTotalCashNeeded);
  yield takeEvery(actionTypes.SET_DOWN_PAYMENT_PERCENT, calculateTotalCashNeeded);
}

export function* calculateDownPayment() {
  yield put(actionCreators.calculateDownPayment());
}

export function* watchDownPaymentDependencies() {
  yield takeEvery(actionTypes.SET_OFFER_PRICE, calculateDownPayment);
  yield takeEvery(actionTypes.SET_DOWN_PAYMENT, calculateDownPayment);
  yield takeEvery(actionTypes.SET_DOWN_PAYMENT_PERCENT, calculateDownPayment);
}

export function* calculatePurchaseCosts() {
  yield put(actionCreators.calculatePurchaseCosts());
}

export function* watchPurchaseCostDependencies() {
  // yield takeEvery(actionTypes.GET_PROPERTY_SUCCESS, calculatePurchaseCosts);
  yield takeEvery(actionTypes.SET_OFFER_PRICE, calculatePurchaseCosts);
  yield takeEvery(actionTypes.UPDATE_PURCHASE_COST_ITEM, calculatePurchaseCosts);
}

export function* watchAndLog() {
  yield takeEvery('*', function* logger(action) {
    const state = yield select()
    // console.log('action', action)
    // console.log('state after', state)
  })
}

// export function* analysisSagas() {
//   yield all([
//     watchAndLog(),
//     watchGetProperty(),
//     watchDownPaymentDependencies(),
//     watchLoanAmountDependencies(),
//     watchPurchaseCostDependencies(),
//     watchTotalCashNeededDependencies(),
//   ])
// }
