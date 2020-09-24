import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import trackingReducer from './trackingDuck';
import routesReducer, {getRoutesAction} from './routesDuck';

let rootReducer = combineReducers({
  tracking: trackingReducer,
  routes: routesReducer,
});

export default function generateStore() {
  let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
  );

  getRoutesAction()(store.dispatch, store.getState);

  return store;
}
