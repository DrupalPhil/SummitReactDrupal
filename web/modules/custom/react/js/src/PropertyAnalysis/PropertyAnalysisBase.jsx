import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {allSagas} from './store/allSagas';
import createSagaMiddleware from 'redux-saga';
import PropertyAnalysis from './PropertyAnalysis';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import {HashRouter} from 'react-router-dom';
import allReducers from './store/allReducers';


// Middleware enhancer
const logger = store => {
  return next => {
    return action => {
      // console.log('[Middleware] Dispatching', action);
      const result = next(action);
      // console.log('[Middleware] next state', store.getState());
      return result;
    };
  };
};

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create Store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(
  applyMiddleware(logger),
  applyMiddleware(thunk),
  applyMiddleware(sagaMiddleware),
);

const initialState = {
  properties: {propertiesSuccess: false},
  property: {propertySuccess: false},
  analysis: {analysisSuccess: false},
};

const store = createStore(allReducers, initialState, enhancers);

// then run the saga
sagaMiddleware.run(allSagas);

const routing = (
  <Provider store={store}>
    {/*https://reacttraining.com/react-router/web/api/HashRouter*/}
    <HashRouter
      // basename={'/'}
      hashType={'hashbang'}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Route path="/" component={PropertyAnalysis}/>
          </div>
        </div>
      </div>
    </HashRouter>
  </Provider>
);

ReactDOM.render(
  routing,
  document.getElementById('propertyAnalysis'),
);

// ReactDOM.render(
//   <Provider store={store}>
//     <PropertyAnalysis/>
//   </Provider>,
//   document.getElementById('propertyAnalysis'),
// );
