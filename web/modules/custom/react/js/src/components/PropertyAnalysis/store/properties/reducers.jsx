import * as actionTypes from './actionTypes';
import {newState} from '../utilities';

function properties(state = {}, action) {
  switch (action.type) {

    case actionTypes.GET_PROPERTIES_SUCCESS:
      return newState(state, {
        propertiesSuccess: true,
        results: action.payload
      });

    default:
      return state;
  }
}

export default properties;
