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
          <Text>{item.title}</Text>
          <Text>
            Distancia: {item.distance} {item.distance === 1000 ? 'km' : 'm'}{' '}
          </Text>
          <Text>Tiempo {item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.Conatiner}>
      <FlatList
        style={{width: '100%'}}
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
    routes: store.routes.routes,
  };
};

export default connect(mapState)(TrackingHistory);
