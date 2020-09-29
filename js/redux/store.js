import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import routesReducer, {getRoutesAction} from './routesDuck';

let rootReducer = combineReducers({
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
