import * as actionTypes from './actionTypes';

export function setProperty(payload) {
  return {type: actionTypes.SET_PROPERTY, payload};
}

export function getProperty(payload = null) {
  return {type: actionTypes.GET_PROPERTY, payload};
}

export function getPropertySuccess(payload) {
  return {type: actionTypes.GET_PROPERTY_SUCCESS, payload};
}
