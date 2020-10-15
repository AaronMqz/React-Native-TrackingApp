import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Modal,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

const ModalSave = ({onSave, distanceTravelled, timing}) => {
  const [newRouteTitle, setNewRouteTitle] = useState('');
  const {height} = Dimensions.get('window'); // fix height when keyboard is open only in android

  return (
    <Modal visible={true} animationType="slide">
      <View style={[styles.ModalContainer, {height: height}]}>
        <View style={styles.ModalLabelContainer}>
          <TextInput
            style={styles.ModalTextInput}
            placeholder={'Enter route name before saving'}
            placeholderTextColor={'grey'}
            value={newRouteTitle}
            onChangeText={(text) => setNewRouteTitle(text)}
          />
        </View>
        <View style={styles.ModalLabelContainer}>
          <Text style={styles.ModalLabel}>Distance</Text>
          <Text style={styles.ModalLabelValue}>{distanceTravelled}</Text>
          <Text>{distanceTravelled === 1000 ? 'km' : 'm'}</Text>
        </View>
        <View style={styles.ModalLabelContainer}>
          <Text style={styles.ModalLabel}>Time</Text>
          <Text style={styles.ModalLabelValue}>{timing}</Text>
          <Text>h:mm:ss</Text>
        </View>
        <TouchableHighlight
          style={
            newRouteTitle === ''
              ? [styles.ModalSave, styles.ModalSaveDisabled]
              : styles.ModalSave
          }
          disabled={newRouteTitle === '' ? true : false}
          onPress={() => onSave(newRouteTitle)}>
          <Text style={styles.ModalSaveText}>Save</Text>
        </TouchableHighlight>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  ModalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalLabelContainer: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    width: '90%',
  },
  ModalLabel: {
    fontSize: 20,
  },
  ModalLabelValue: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  ModalTextInput: {
    borderBottomWidth: 2,
    borderColor: '#2ecc71',
    width: '90%',
    textAlign: 'center',
    fontSize: 20,
  },
  ModalSave: {
    position: 'absolute',
    bottom: 20,
    height: 55,
    width: '90%',
    backgroundColor: '#2ecc71',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  ModalSaveDisabled: {
    backgroundColor: '#95a5a6',
  },
  ModalSaveText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
  },
});

export default ModalSave;
