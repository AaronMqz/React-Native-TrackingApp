//import useStorage from '../hooks/useStorage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

// CONSTANTS
let initalData = {
  fetching: false,
  current: {},
  routes: [
    {
      id: '',
      title: '',
      distance: 0,
      time: '',
      img: '',
      routes: [],
    },
  ],
};
let GET_ROUTES_FETCHING = 'GET_ROUTES_FETCHING';
let GET_ROUTES_SUCCESS = 'GET_ROUTES_SUCCESS';
let GET_ROUTES_ERROR = 'GET_ROUTES_ERROR';
let SAVE_ROUTES = 'SAVE_ROUTES';
let GET_ROUTE_DETAIL = 'GET_ROUTE_DETAIL';

// REDUCERS
const reducer = (state = initalData, {type, payload}) => {
  switch (type) {
    case GET_ROUTES_FETCHING:
      return {...state, fetching: true};
    case GET_ROUTES_SUCCESS:
      return {
        ...state,
        routes: payload,
        fetching: false,
      };
    case SAVE_ROUTES:
      return {
        ...state,
        routes: [...state.routes, payload],
      };
    case GET_ROUTE_DETAIL:
      let current = state.routes.filter((route) => {
        return route.id === payload;
      })[0];
      return {...state, current: current};
    default:
      return state;
  }
};
export default reducer;

// ACTIONS - THUNKS
export let getRoutesAction = () => (dispatch, getState) => {
  dispatch({type: GET_ROUTES_FETCHING});

  //const {getStorage} = useStorage();
  let getRoutesFromStorage = async () => {
    //let routes = await getStorage();
    return dispatch({
      type: GET_ROUTES_SUCCESS,
      payload: getState().routes.routes,
    });
  };

  return getRoutesFromStorage();
};

export let saveRoutesAction = (mapRoute) => (dispatch, getState) => {
  //const {saveStorage} = useStorage();
  const saveTracking = async () => {
    mapRoute.id = uuidv4();
    const newRoutes = getState().routes.routes.concat(mapRoute);

    //await saveStorage(newRoutes);

    dispatch({type: SAVE_ROUTES, payload: mapRoute});
  };

  saveTracking();
};

export let getRouteDetail = (id) => (dispatch, getState) => {
  dispatch({type: GET_ROUTES_FETCHING});
  dispatch({type: GET_ROUTE_DETAIL, payload: id});
};
