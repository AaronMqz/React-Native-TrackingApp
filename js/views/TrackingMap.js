import React, {useState, useRef} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Button} from 'react-native';
import {connect} from 'react-redux';

import Map from '../components/Map';
import useLocation from '../hooks/useLocation';
import {saveRoutesAction} from '../redux/routesDuck';

const TrackingMap = ({saveRoutesAction}) => {
  const {
    stateLocation,
    stopTracking,
    startTracking,
    clearTracking,
  } = useLocation();
  const [toogle, setToggle] = useState(true);
  const mapRef = useRef();
  const mapRef2 = useRef();

  const handleButton = () => {
    setToggle(!toogle);
    if (toogle) {
      startTracking();
    } else {
      stopTracking();
      // Take snapShot of the tracking
      // Works for iOS and Android
      mapRef.current.takeSnapShot((data) => {
        let mapRoute = {
          title: 'test',
          distance: stateLocation.distanceTravelled,
          time: '3min',
          img: data,
          routes: stateLocation.routeCoordinates,
        };
        saveRoutesAction(mapRoute);
        clearTracking();
      });
      /*
      // Only works for iOS
      // Error in Android :(
      mapRef.current.takeSnapShot((data) => {
        let mapRoute = {
          title: 'test',
          distance: stateLocation.distanceTravelled,
          time: '3min',
          img: data,
          routes: stateLocation.routeCoordinates,
        };
        saveRoutesAction(mapRoute);
        clearTracking();
      });*/
    }
  };

  return (
    <SafeAreaView style={styles.Conatiner}>
      <Map ref={mapRef} ref2={mapRef2} location={stateLocation} />
      <View style={styles.Footer}>
        <Text>
          Distancia: {stateLocation.distanceTravelled}{' '}
          {stateLocation.distanceTravelled === 1000 ? 'km' : 'm'}
        </Text>
        <Button
          onPress={() => handleButton()}
          title={toogle ? 'Start' : 'Stop'}
        />
        <Button
          style={styles.Footer}
          onPress={() => {
            mapRef.current.center();
          }}
          title={'Ubicacion'}
        />
      </View>
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

export default connect(null, {saveRoutesAction})(TrackingMap);
