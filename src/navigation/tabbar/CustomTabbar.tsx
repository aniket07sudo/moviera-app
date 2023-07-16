import React from 'react';
import {BlurView} from '@react-native-community/blur';
import { BottomTabBar } from "@react-navigation/bottom-tabs"
import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from 'react-native-svg';

const TABBAR_HEIGHT = Dimensions.get('screen').height * 0.1

const CustomTabbar = (props:any) => {

    return (
        <>
        <BlurView style={{position:'absolute',bottom:0,left:0,right:0,maxHeight:TABBAR_HEIGHT}} blurType='dark' blurAmount={6} blurRadius={25} overlayColor='transparent'>
            <BottomTabBar style={{height:TABBAR_HEIGHT,maxHeight:TABBAR_HEIGHT}} {...props} />
        </BlurView>
        </>
    )
}

export default CustomTabbar;