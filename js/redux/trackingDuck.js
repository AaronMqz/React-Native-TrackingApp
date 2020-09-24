// CONSTANTS
let initalData = {
  latitude: '',
  longitude: '',
  distance: 0,
  time: '',
};
let START_TRACKING = 'START_TRACKING';

// REDUCERS
const reducer = (state = initalData, {type, payload}) => {
  switch (type) {
    case START_TRACKING:
    default:
      return state;
  }
};
export default reducer;

// ACTIONS
