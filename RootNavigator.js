import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View, Text, Button } from 'react-native';
import HomeScreen from './HomeScreen';
import Game from './Game';
import GameDetails from './GameDetails';



const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  GameStart: {
    screen: Game
  },
  GameDetails: {
    screen: GameDetails
  }
});

export default RootNavigator;
