import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {getRouteDetail} from '../redux/routesDuck';

const TrackingDetail = ({current, getRouteDetail, route}) => {
  useEffect(() => {
    getRouteDetail(route.params.id);
  }, []);
  return (
    <SafeAreaView style={styles.Conatiner}>
      <Image source={{uri: current.img}} style={{width: '100%', height: 400}} />
      <Text>{current.title}</Text>
      <Text>
        Distancia: {current.distance} {current.distance === 1000 ? 'km' : 'm'}{' '}
      </Text>
      <Text>Tiempo {current.time}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Conatiner: {
    flex: 1,
  },
  Label: {
    fontSize: 24,
  },
  Card: {
    borderStyle: 'solid',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    padding: 2,
    backgroundColor: 'white',
  },
});

let mapState = (store) => {
  return {
    current: store.routes.current,
  };
};

export default connect(mapState, {getRouteDetail})(TrackingDetail);
