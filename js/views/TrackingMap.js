import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <Map ref={mapRef} location={stateLocation} />
      <View style={styles.Header}>
        <View style={styles.HeaderSection}>
          <Text style={styles.HeaderLabel}>
            {stateLocation.distanceTravelled}{' '}
            {stateLocation.distanceTravelled === 1000 ? 'km' : 'm'}
          </Text>
          <Text style={styles.HeaderLabelSubtitle}>Distance</Text>
        </View>
        <View style={styles.HeaderSection}>
          <Text style={styles.HeaderLabel}>{stateLocation.timing} </Text>
          <Text style={styles.HeaderLabelSubtitle}>Time</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.ActionButton}
        onPress={() => handleButton()}>
        <Text style={styles.ActionLabel}>{toogle ? 'Go' : 'Stop'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.LocationButton}
        onPress={() => {
          mapRef.current.center();
        }}>
        <Icon name={'location-arrow'} size={22} color={'#00a680'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Conatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ActionLabel: {
    fontSize: 24,
    color: 'white',
  },
  LocationButton: {
    position: 'absolute',
    backgroundColor: 'white',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 30,
    right: 10,
    borderRadius: 20,
  },
  Header: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: '90%',
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
  },
  HeaderSection: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 150,
  },
  HeaderLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  HeaderLabelSubtitle: {
    fontSize: 12,
  },
  ActionButton: {
    position: 'absolute',
    backgroundColor: '#4caf50',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 30,
  },
});

export default connect(null, {saveRoutesAction})(TrackingMap);
