/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SplashScreen from 'react-native-splash-screen';
import AppRouter from './src/navigation/root-navigator';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import MainNavigation from './src/screens/main/MainNavigator';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import HomeScreen from './src/screens/main/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './src/screens/main/Profile';
const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  useEffect(()=>{
    SplashScreen.hide()
 },[])

  return (
      <AppRouter />
  );
}

export default App;
