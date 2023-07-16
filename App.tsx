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
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StoreProvider } from './src/store/storeProvider';

import 'react-native-gesture-handler'


function App(): JSX.Element {

  useEffect(()=>{
    SplashScreen.hide()
 },[])

  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
}

export default App;
