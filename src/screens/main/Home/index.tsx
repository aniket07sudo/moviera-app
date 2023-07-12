import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground,StatusBar,StyleSheet, Text, View , FlatList, ScrollView, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors } from "../../../theme/colors";
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import CarouselComponent from "../../../components/Carousel";
import TrayComponent from "../../../components/Tray";
import { TrayData } from "./constants";
import LinearGradient from "react-native-linear-gradient";

const SCREEN_WIDTH = Dimensions.get('screen').width;
const ITEM_WIDTH = SCREEN_WIDTH;



const HomeScreen = () => {

    const ScrollY = useSharedValue(0);

    const ScrollHandler = useAnimatedScrollHandler({
        onScroll:(event) => {
            ScrollY.value = event.contentOffset.y
            console.log("ScrollY");
            
        }
    })
    
    return (
        <>
        <LinearGradient colors={[Colors.secondary,'transparent']} style={Styles.statusBarGradient} />

        <Animated.ScrollView 
            scrollEventThrottle={16} 
            onScroll={ScrollHandler} 
            contentContainerStyle={{paddingBottom:90}} 
            style={Styles.container}
        >
            <CarouselComponent ScrollY={ScrollY} />
            <TrayComponent data={TrayData} label={'Continue Watching'} />
            <TrayComponent data={TrayData} label={'Trending Now'} />
            <TrayComponent data={TrayData} label={'Latest'} />
        </Animated.ScrollView>
        </>
    )
}

const Styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.secondary
    },
    statusBarGradient:{
        position:'absolute',
        zIndex:1,
        width:SCREEN_WIDTH,
        height:40,
    },
})

export default HomeScreen;



