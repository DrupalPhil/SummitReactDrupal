import * as actionTypes from './actionTypes';

/*
 * action creators
 */

export function setModifierForm(payload) {
  return {type: actionTypes.SET_MODIFIER_FORM, payload};
}



export function initAnalysis(payload) {
  return {type: actionTypes.INIT_ANALYSIS, payload};
}

export function setOfferPrice(payload) {
  return {type: actionTypes.SET_OFFER_PRICE, payload};
}

export function setLoanAmount(payload) {
  return {type: actionTypes.SET_LOAN_AMOUNT, payload};
}

export function setDownPayment(payload) {
  return {type: actionTypes.SET_DOWN_PAYMENT, payload};
}

export function setDownPaymentPercent(payload) {
  return {type: actionTypes.SET_DOWN_PAYMENT_PERCENT, payload};
}

export function calculateDownPayment() {
  return {type: actionTypes.CALC_DOWN_PAYMENT};
}

export function calculateLoanAmount() {
  return {type: actionTypes.CALC_LOAN_AMOUNT};
}

export function calculateTotalCashNeeded() {
  return {type: actionTypes.CALC_TOTAL_CASH_NEEDED};
}

export function calculatePurchaseCosts() {
  return {type: actionTypes.CALC_PURCHASE_COSTS};
}

export function addPurchaseCostItem(payload) {
  return {type: actionTypes.ADD_PURCHASE_COST_ITEM, payload};
}

export function deletePurchaseCostItem(payload) {
  return {type: actionTypes.DELETE_PURCHASE_COST_ITEM, payload};
}

export function updatePurchaseCostItem(payload) {
  return {type: actionTypes.UPDATE_PURCHASE_COST_ITEM, payload};
}

export function reorderItemizedPurchaseCosts(payload) {
  return {type: actionTypes.REORDER_ITEMIZED_PURCHASE_COSTS, payload};
}
