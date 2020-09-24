import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import {navigationConfig} from '../config/navigationConfig';

const Navigation = () => {
  const Tab = createBottomTabNavigator();
  const {initialRouteName, stacks, tabBarOptions, iconsSize} = navigationConfig;
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      tabBarOptions={tabBarOptions}>
      {stacks.map((stack, index) => {
        return (
          <Tab.Screen
            key={index}
            name={stack.name}
            component={CreateStack(stack.views)}
            options={{
              tabBarIcon: ({color}) => (
                <Icon name={stack.icon} size={iconsSize} color={color} />
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const CreateStack = (views) => {
  const Stack = createStackNavigator();

  const StackScreen = () => {
    return (
      <Stack.Navigator>
        {views.map((view, index) => {
          return (
            <Stack.Screen
              key={index}
              name={view.name}
              component={view.component}
            />
          );
        })}
      </Stack.Navigator>
    );
  };
  return StackScreen;
};

export default Navigation;
