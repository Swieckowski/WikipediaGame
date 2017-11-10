import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View, Text, Button } from 'react-native';
import { Provider } from 'react-redux';
import RootNavigator from './RootNavigator';
import store from './store';

const Root = ({ navigation }) => (
  <Provider store={store}>
    <RootNavigator/>
  </Provider>
);

export default Root;