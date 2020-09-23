import React from 'react';
import {SafeAreaView, StatusBar, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import Navigation from './js/navigation';

let WithNavigation = () => (
  <NavigationContainer>
    <Navigation />
  </NavigationContainer>
);

export default function App() {
  return <WithNavigation />;
}
