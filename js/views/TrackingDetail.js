import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {getRouteDetail} from '../redux/routesDuck';

const TrackingDetail = ({current, getRouteDetail, route}) => {
  useEffect(() => {
    getRouteDetail(route.params.id);
  }, []);

  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView style={styles.ContainerScroll}>
        <View style={styles.DetailContainer}>
          <View style={styles.DetailItems}>
            <Text style={styles.TitleName}>{current.title}</Text>
            <View style={styles.DetailItemRow}>
              <View style={styles.DetailItemColumn}>
                <Text style={styles.Title}>Distance</Text>
                <Text style={styles.Subtitle}>
                  {current.distance}
                  {current.distance === 1000 ? ' km' : ' m'}
                </Text>
              </View>
              <View style={styles.DetailItemColumn}>
                <Text style={styles.Title}>Time</Text>
                <Text style={styles.Subtitle}>{current.time}</Text>
              </View>
              <View style={styles.DetailItemColumn}>
                <Text style={styles.Title}>Date</Text>
                <Text style={styles.Subtitle}>{current.datetime}</Text>
              </View>
            </View>
          </View>
          <Image source={{uri: current.img}} style={styles.DetailImage} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  TitleName: {
    fontSize: 35,
    color: 'white',
    fontWeight: 'bold',
  },
  Title: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
  },
  Subtitle: {
    fontSize: 20,
    color: 'white',
  },
  ContainerScroll: {
    paddingTop: 10,
    backgroundColor: 'white',
  },
  DetailContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: 'white',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#2ecc71',
  },
  DetailItems: {
    padding: 15,
  },
  DetailItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
  },
  DetailItemColumn: {
    alignItems: 'center',
  },
  DetailImage: {
    width: '100%',
    height: 700,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
});

let mapState = (store) => {
  return {
    current: store.routes.current,
  };
};

export default connect(mapState, {getRouteDetail})(TrackingDetail);
