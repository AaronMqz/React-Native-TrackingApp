import React, {useEffect, useReducer} from 'react';
import {getDistance} from 'geolib';
import moment from 'moment';

import useBackground from '../hooks/useBackground';
import useTimerBackground from '../hooks/useTimerBackground';

const initialState = {
  latitude: 0,
  longitude: 0,
  routeCoordinates: [],
  distanceTravelled: 0,
  timing: 0,
  datetime: '',
  prevLatLng: {},
  startTracking: false,
  status: {},
  error: undefined,
};

const GET_LOCATION = 'GET_LOCATION';
const STATUS_LOCATION = 'STATUS_LOCATION';
const START_TRACKING = 'START_TRACKING';
const STOP_TRACKING = 'STOP_TRACKING';
const SAVE_TRACKING = 'SAVE_TRACKING';
const CLEAR_TRACKING = 'CLEAR_TRACKING';
const ERROR_LOCATION = 'ERROR_LOCATION';
const START_TIMING = 'START_TIMING';

const newDistance = ({latitude, longitude}, newCoordinate) => {
  return getDistance(
    {
      latitude: latitude,
      longitude: longitude,
    },
    newCoordinate,
  );
};

const locationReducer = (state, {type, payload}) => {
  switch (type) {
    case STATUS_LOCATION:
      return {...state, statusLocation: payload};
    case GET_LOCATION:
      const {latitude, longitude} = payload;
      return {...state, latitude, longitude};
    case SAVE_TRACKING:
      const newCoordinate = {
        latitude: payload.latitude,
        longitude: payload.longitude,
      };
      const distancia = newDistance(state, newCoordinate);
      const sumDistance = state.distanceTravelled + distancia;
      return {
        ...state,
        latitude: payload.latitude,
        longitude: payload.longitude,
        routeCoordinates: [...state.routeCoordinates, newCoordinate],
        distanceTravelled: sumDistance,
        prevLatLng: {latitude: state.latitude, longitude: state.longitude},
      };
    case START_TRACKING:
      let createDateTime = moment().format('MM/DD/YY');
      return {...state, startTracking: true, datetime: createDateTime};
    case STOP_TRACKING:
      return {...state, startTracking: false};
    case START_TIMING:
      return {...state, timing: payload};
    case CLEAR_TRACKING:
      return {
        ...state,
        routeCoordinates: [],
        distanceTravelled: 0,
        prevLatLng: {},
        status: {},
        error: undefined,
      };
    default:
      return state;
  }
};

const useLocation = () => {
  const {coordinates, BackgroundGeolocation} = useBackground();
  const {startTiming, stopTiming, clearTiming, timing} = useTimerBackground();
  const [stateLocation, dispatch] = useReducer(locationReducer, initialState);

  const stopTracking = () => {
    //BackgroundGeolocation.stop();
    dispatch({type: STOP_TRACKING});
    stopTiming();
  };

  const startTracking = () => {
    if (!stateLocation.isRunning) {
      BackgroundGeolocation.start();
    }
    startTiming();
    dispatch({type: START_TRACKING});
  };

  const clearTracking = () => {
    dispatch({type: CLEAR_TRACKING});
    clearTiming();
  };

  const getCurrentLocation = () => {
    if (!stateLocation.isRunning) {
      BackgroundGeolocation.start();
    }
    BackgroundGeolocation.getCurrentLocation((location, error) => {
      if (error) {
        dispatch({type: ERROR_LOCATION});
      } else {
        dispatch({type: GET_LOCATION, payload: location});
      }
    });
  };

  const getLocationStatus = (callback) => {
    BackgroundGeolocation.checkStatus((status) => {
      callback(status);
    });
  };

  useEffect(() => {
    getLocationStatus((status) => {
      dispatch({type: STATUS_LOCATION, payload: status});
    });
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (stateLocation.startTracking) {
      dispatch({type: SAVE_TRACKING, payload: coordinates});
    } else {
      dispatch({type: GET_LOCATION, payload: coordinates});
    }
  }, [coordinates, stateLocation.startTracking]);

  useEffect(() => {
    dispatch({type: START_TIMING, payload: timing});
  }, [timing]);

  return {
    stateLocation,
    stopTracking,
    startTracking,
    clearTracking,
    getLocationStatus,
  };
};

export default useLocation;
