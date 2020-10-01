import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const TrackingHistory = ({routes}, props) => {
  const navigation = useNavigation();

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', {id: item.id})}>
        <View style={styles.Card}>
          <Image
            source={{uri: item.img}}
            style={{width: '100%', height: 100}}
          />
          <Text style={styles.CardTitle}>{item.title}</Text>
          <View style={styles.CardItemContainer}>
            <View style={styles.CardItem}>
              <Text style={styles.CardItemTitle}>Distancia</Text>
              <Text style={styles.CardItemSubTitle}>
                {item.distance} {item.distance === 1000 ? 'km' : 'm'}
              </Text>
            </View>
            <View style={styles.CardItem}>
              <Text style={styles.CardItemTitle}>Tiempo</Text>
              <Text style={styles.CardItemSubTitle}>{item.time}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.Conatiner}>
      <FlatList
        style={styles.FlatList}
        data={routes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Conatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  FlatList: {
    width: '100%',
    paddingTop: 10,
  },
  Label: {
    fontSize: 24,
  },
  Card: {
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: 'white',
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,

    backgroundColor: 'white',
  },
  CardTitle: {
    marginLeft: 20,
    fontSize: 18,
    paddingTop: 10,
    paddingBottom: 10,
  },
  CardItemContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    justifyContent: 'space-between',
    width: '50%',
    paddingBottom: 10,
  },
  CardItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  CardItemTitle: {
    fontSize: 10,
    color: 'grey',
  },
  CardItemSubTitle: {
    fontSize: 18,
  },
});

let mapState = (store) => {
  return {
    routes: store.routes.routes,
  };
};

export default connect(mapState)(TrackingHistory);
