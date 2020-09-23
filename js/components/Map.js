import React, {useEffect, useRef, forwardRef, useImperativeHandle} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.009220150969525776;
const LONGITUD_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const initialRegion = {
  latitude: 37.32478481911384,
  longitude: -122.01917052268982,
  latitudeDelta: 5,
  longitudeDelta: 5,
};

const Map = forwardRef(({location}, ref) => {
  const mapRef = useRef();

  const setRegion = () => {
    return {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUD_DELTA,
    };
  };

  useImperativeHandle(ref, () => ({
    center() {
      mapRef.current.animateToRegion(setRegion(), 1000);
    },
    takeSnapShot(callback) {
      mapRef.current.takeSnapshot(
        300,
        400,
        {
          latitude: location.latitude - SPACE,
          longitude: location.longitude - SPACE,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01 * ASPECT_RATIO,
        },
        (err, data) => {
          if (err) {
            console.log('error google maps taking snapshot', err);
            throw err;
          }
          return callback(data.uri);
        },
      );
    },
  }));

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitToSuppliedMarkers(['1']);
    }
  }, []);

  return (
    <View style={styles.container}>
      {location.longitude !== 0 && (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          initialRegion={initialRegion}
          showsUserLocation={true}
          onMapReady={() => {
            mapRef.current.animateToRegion(setRegion(), 2000);
          }}>
          {/*
        <Marker
        identifier={'1'}
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
      />*/}
          {location.startTracking && (
            <Polyline coordinates={location.routeCoordinates} strokeWidth={5} />
          )}
        </MapView>
      )}
    </View>
  );
});

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
