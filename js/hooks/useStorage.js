import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const useStorage = () => {
  const saveStorage = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('@tracking', jsonValue);
    } catch (e) {
      // saving error
      console.log('error al guardar', e);
    }
  };

  const getStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@tracking');
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // error reading value
      console.log('error al obtener', e);
    }
  };

  return {saveStorage, getStorage};
};

export default useStorage;
