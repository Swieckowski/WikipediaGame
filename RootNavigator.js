import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View, Text, Button } from 'react-native';
import HomeScreen from './HomeScreen';
import Game from './Game';
import GameDetails from './GameDetails';
import CustomGame from './CustomGame';



const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen
  },
  GameStart: {
    screen: Game
  },
  GameDetails: {
    screen: GameDetails
  },
  CustomGame:{
    screen: CustomGame
  }
});

export default RootNavigator;
