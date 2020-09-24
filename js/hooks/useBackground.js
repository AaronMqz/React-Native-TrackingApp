import React, {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

const useBackground = () => {
  const [coordinates, SetCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 2,
      notificationTitle: 'Background tracking',
      //notificationText: 'enabled',
      debug: false,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      pauseLocationUpdates: false,
      saveBatteryOnBackground: true,
      //url: 'http://192.168.81.15:3000/location',
      //httpHeaders: {
      //  'X-FOO': 'bar',
      //},
      // customize post properties
      //postTemplate: {
      //  lat: '@latitude',
      //  lon: '@longitude',
      //  foo: 'bar', // you can also add your own properties
      //}
    });

    BackgroundGeolocation.on('location', (location) => {
      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task
      SetCoordinates({
        latitude: location.latitude,
        longitude: location.longitude,
      });
      console.log('background location: ' + Platform.OS, location);

      BackgroundGeolocation.startTask((taskKey) => {
        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on('error', (error) => {
      console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[INFO] BackgroundGeolocation service has been stopped');
    });

    BackgroundGeolocation.on('authorization', (status) => {
      console.log(
        '[INFO] BackgroundGeolocation authorization status: ' + status,
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(
          () =>
            Alert.alert(
              'App requires location tracking permission',
              'Would you like to open app settings?',
              [
                {
                  text: 'Yes',
                  onPress: () => BackgroundGeolocation.showAppSettings(),
                },
                {
                  text: 'No',
                  onPress: () => console.log('No Pressed'),
                  style: 'cancel',
                },
              ],
            ),
          1000,
        );
      }
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.checkStatus((status) => {
      console.log(
        '[INFO] BackgroundGeolocation service is running',
        status.isRunning,
      );
      console.log(
        '[INFO] BackgroundGeolocation services enabled',
        status.locationServicesEnabled,
      );
      console.log(
        '[INFO] BackgroundGeolocation auth status: ' + status.authorization,
      );

      // you don't need to check status before start (this is just the example)
      if (!status.isRunning) {
        //BackgroundGeolocation.start(); //triggers start on start event
      }
    });

    return () => {
      console.log('removiendo listeners');
      BackgroundGeolocation.removeAllListeners();
    };
  }, []);

  return {coordinates, BackgroundGeolocation};
};

export default useBackground;
