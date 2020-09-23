import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import BgTracking from './js/Background';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <BgTracking />
      </SafeAreaView>
    </>
  );
};

export default App;
