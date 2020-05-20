import {combineReducers} from 'redux';
import analysis from './analysis/reducers';
import properties from './properties/reducers';
import property from './property/reducers';

const allReducers = combineReducers({
  analysis,
  property,
  properties
});


export default allReducers;
