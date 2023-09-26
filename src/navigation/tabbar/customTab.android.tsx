import React, { memo, useEffect } from 'react';
import { BottomTabBar } from "@react-navigation/bottom-tabs"
import { Dimensions, StyleSheet, View } from "react-native";
import { Text } from 'react-native-svg';

const TABBAR_HEIGHT = 70;

const CustomTabbar = ({...props}) => {

    console.log("Pro",props.state.index);
    
    return (
        <View style={{position:'absolute',bottom:0,left:0,right:0,maxHeight:TABBAR_HEIGHT,backgroundColor:'rgba(0,0,0,0.7)'}} >
            <BottomTabBar style={{height:TABBAR_HEIGHT,maxHeight:TABBAR_HEIGHT}} {...props} />
        </View>
    )
}

export default memo(CustomTabbar);