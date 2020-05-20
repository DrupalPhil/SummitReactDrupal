import {all} from 'redux-saga/effects';
import * as propertiesSagas from './properties/sagas';
import * as propertySagas from './property/sagas';
import * as analysisSagas from './analysis/sagas'; // TODO: fix naming conventions

export function* allSagas() {
  yield all([

    /*
    * Properties Sagas
    * */
    propertiesSagas.watchGetProperties(),

    /*
    * Property Sagas
    * */
    propertySagas.watchSetProperty(),
    propertySagas.watchGetProperty(),
    propertySagas.watchGetPropertySuccess(),

    /*
    * Analysis Sagas
    * */
    // analysisSagas.watchAndLog(),
    analysisSagas.watchDownPaymentDependencies(),
    analysisSagas.watchLoanAmountDependencies(),
    analysisSagas.watchPurchaseCostDependencies(),
    analysisSagas.watchTotalCashNeededDependencies(),
  ]);
}
