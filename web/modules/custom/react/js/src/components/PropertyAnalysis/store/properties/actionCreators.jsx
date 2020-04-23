import * as actionTypes from './actionTypes';

export function getProperties() {
  return {type: actionTypes.GET_PROPERTIES};
}

export function getPropertiesSuccess(payload) {
  return {type: actionTypes.GET_PROPERTIES_SUCCESS, payload};
}
