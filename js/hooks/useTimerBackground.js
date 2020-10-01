import React, {useState} from 'react';
import moment from 'moment';

let _interval = null;
let _getCurrentTime = null;

// Function to get timing working in background
const diffTime = (then, now) => {
  const ms = moment(now, 'MM/DD/YYYY HH:mm:ss').diff(
    moment(then, 'MM/DD/YYYY HH:mm:ss'),
  );
  const duration = moment.duration(ms);
  const hours = Math.floor(duration.asHours());
  const time = `${hours}:${moment.utc(ms).format('mm:ss')}`;
  return time;
};

const useTimerBackground = () => {
  const [timing, setTiming] = useState(0);

  const startTiming = () => {
    _getCurrentTime = moment().format('MM/DD/YYYY HH:mm:ss');
    _interval = setInterval(() => {
      var newTiming = diffTime(
        _getCurrentTime,
        moment().format('MM/DD/YYYY HH:mm:ss'),
      );
      setTiming(newTiming);
    }, 1000);
  };

  const stopTiming = () => {
    clearInterval(_interval);
  };

  const clearTiming = () => {
    setTiming(0);
  };

  return {startTiming, stopTiming, clearTiming, timing};
};

export default useTimerBackground;
