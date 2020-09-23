import TrackingDetail from '../views/TrackingDetail';
import TrackingHistory from '../views/TrackingHistory';
import TrackingMap from '../views/TrackingMap';
import Home from '../views/Home';

export const navigationConfig = {
  initialRouteName: 'home',
  iconsSize: 22,
  tabBarOptions: {
    inactiveTintColor: '#646464',
    activeTintColor: '#00a680',
  },
  stacks: [
    {
      name: 'Home',
      icon: 'home',
      views: [
        {
          name: 'Home',
          component: Home,
        },
      ],
    },
    {
      name: 'Tracking',
      icon: 'map-marker',
      views: [
        {
          name: 'Tracking',
          component: TrackingMap,
        },
      ],
    },
    {
      name: 'Routes',
      icon: 'list',
      views: [
        {
          name: 'Routes',
          component: TrackingHistory,
        },
        {
          name: 'Detail',
          component: TrackingDetail,
        },
      ],
    },
  ],
};
