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
import Orientation from 'react-native-orientation-locker';
import { enableFreeze, enableScreens } from 'react-native-screens';


function App(): JSX.Element {

  enableFreeze(true);


  useEffect(()=>{
    SplashScreen.hide();
        
    // Orientation.lockToPortrait();
 },[])

  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
}

export default App;
