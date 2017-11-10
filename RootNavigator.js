import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View, Text, Button } from 'react-native';
import HomeScreen from './HomeScreen';
import Game from './Game';



const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  GameStart: {
    screen: Game
  }
});

export default RootNavigator;
