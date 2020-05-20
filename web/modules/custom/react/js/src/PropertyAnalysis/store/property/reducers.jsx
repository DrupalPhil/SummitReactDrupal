import * as actionTypes from './actionTypes';
import {newState} from '../utilities';

function property(state = {}, action) {
  switch (action.type) {

    case actionTypes.SET_PROPERTY:
      return newState(state, {
        propertySuccess: true,
        results: action.payload
      });

    case actionTypes.GET_PROPERTY_SUCCESS:
      return newState(state, {
        propertySuccess: true,
        results: action.payload
      });

    default:
      return state;
  }
}

export default property;
