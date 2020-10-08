import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, Modal} from 'react-native';

var interval = null;

const ModalTimer = ({onClose}) => {
  const [startModalVisible, setStartModalVisible] = useState(false);
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    setStartModalVisible(true);
  }, []);

  useEffect(() => {
    if (startModalVisible) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }
  }, [startModalVisible]);

  useEffect(() => {
    if (seconds <= 0) {
      setSeconds(3);
      clearInterval(interval);
      onClose();
    }
  }, [seconds]);

  return (
    <SafeAreaView style={styles.Conatiner}>
      <Modal visible={startModalVisible}>
        <View style={styles.ModalContainer}>
          <Text style={styles.TimerLabel}>{seconds}</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Conatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TimerLabel: {
    fontSize: 250,
  },
});

export default ModalTimer;
