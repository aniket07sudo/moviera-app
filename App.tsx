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
  Dimensions,
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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';


function App(): JSX.Element {

  enableFreeze(true);

  useEffect(()=>{
    SplashScreen.hide();
    // Orientation.lockToPortrait();
 },[])

  return (
      <StoreProvider>
        {/* <GestureHandlerRootView style={{flex:1}}> */}
        <AppRouter />
        {/* </GestureHandlerRootView> */}

      </StoreProvider>
  );
}

export default App;
