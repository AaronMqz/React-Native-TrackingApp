import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import generateStore from './js/redux/store';
import Navigation from './js/navigation';

let store = generateStore();

let WithNavigation = () => (
  <NavigationContainer>
    <Navigation />
  </NavigationContainer>
);

let WithStore = () => (
  <Provider store={store}>
    <WithNavigation />
  </Provider>
);

export default function App() {
  return <WithStore />;
}
