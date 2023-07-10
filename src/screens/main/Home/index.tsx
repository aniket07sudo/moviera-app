import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground,StatusBar,StyleSheet, Text, View , FlatList, ScrollView, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors } from "../../../theme/colors";
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import CarouselComponent from "../../../components/Carousel";
import TrayComponent from "../../../components/Tray";
import { TrayData } from "./constants";
import Video from 'react-native-video'
import { getTabBarHeight } from "@react-navigation/bottom-tabs/lib/typescript/src/views/BottomTabBar";

const SCREEN_WIDTH = Dimensions.get('screen').width;
const ITEM_WIDTH = SCREEN_WIDTH;



const HomeScreen = () => {
    
    return (
        <ScrollView contentContainerStyle={{paddingBottom:90}} style={Styles.container}>
            <CarouselComponent />
            <TrayComponent data={TrayData} label={'Trending Now'} />
            <TrayComponent data={TrayData} label={'Latest'} />
            {/* <Video 
                style={{width:'100%',height:400,backgroundColor:'red'}} 
                source={{
                    uri:'http://localhost:4000/video',
                    headers:{
                        'Range':'bytes=0-'
                    }
                }}  
            />  */}
        </ScrollView>
    )
}

const Styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.secondary
    },
 
})

export default HomeScreen;



