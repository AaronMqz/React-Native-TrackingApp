import React, {useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Button} from 'react-native';

import Map from '../components/Map';
import useBackground from '../hooks/useBackground';

const TrackingMap = () => {
  const {coordinates, BackgroundGeolocation} = useBackground();

  const mapRef = useRef();

  return (
    <SafeAreaView style={styles.Conatiner}>
      <Map ref={mapRef} location={coordinates} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Conatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Label: {
    fontSize: 24,
  },
  Footer: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: '90%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 30,
  },
});

export default TrackingMap;
