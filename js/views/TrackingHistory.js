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
          <Text style={styles.CardTitle}>{item.title}</Text>
          <View style={styles.CardItemContainer}>
            <View style={styles.CardItem}>
              <Text style={styles.CardItemTitle}>Distance</Text>
              <Text style={styles.CardItemSubTitle}>
                {item.distance} {item.distance === 1000 ? 'km' : 'm'}
              </Text>
            </View>
            <View style={styles.CardItem}>
              <Text style={styles.CardItemTitle}>Time</Text>
              <Text style={styles.CardItemSubTitle}>{item.time}</Text>
            </View>
            <View style={styles.CardItem}>
              <Text style={styles.CardItemTitle}>Date</Text>
              <Text style={styles.CardItemSubTitle}>{item.datetime}</Text>
            </View>
          </View>
          <Image source={{uri: item.img}} style={styles.CardImage} />
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
    paddingBottom: 0,
    backgroundColor: 'white',
  },
  Label: {
    fontSize: 24,
  },
  Card: {
    borderRadius: 12,
    borderColor: 'white',
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#2ecc71',
  },
  CardImage: {
    height: 100,
    width: '100%',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  CardTitle: {
    color: 'white',
    marginLeft: 20,
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  CardItemContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  CardItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  CardItemTitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
  CardItemSubTitle: {
    fontSize: 18,
    color: 'white',
  },
});

let mapState = (store) => {
  return {
    routes: store.routes.routes,
  };
};

export default connect(mapState)(TrackingHistory);
