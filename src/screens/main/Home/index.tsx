import React, { useEffect, useState } from "react";
import { Dimensions,StyleSheet, Text, View , FlatList, ScrollView, Image, Button } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors } from "../../../theme/colors";
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import CarouselComponent from "../../../components/Carousel";
import TrayComponent from "../../../components/Tray";
import { TrayData } from "./constants";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch, useSelector } from "react-redux";

const SCREEN_WIDTH = Dimensions.get('screen').width;
const ITEM_WIDTH = SCREEN_WIDTH;

const ITEM_HEIGHT = Dimensions.get('screen').height * 0.68;

const HomeScreen = () => {

    // const AppState = useSelector(state => state);
    const dispatch = useDispatch();

    // console.log("Appstate",AppState);
    

    const ScrollY = useSharedValue(0);

    const ScrollHandler = useAnimatedScrollHandler({
        onScroll:(event) => {
            ScrollY.value = event.contentOffset.y
        }
    })

    // const ScrollAnimatedStyle = useAnimatedStyle(() => {

    //     return {
    //         marginTop:interpolate(ScrollY.value,[0,ITEM_HEIGHT],[0,-ITEM_HEIGHT / 2])
    //     }
    // })
    
    return (
        <>
        <LinearGradient colors={[Colors.secondary,'transparent']} style={Styles.statusBarGradient} />
        <Animated.ScrollView 
            scrollEventThrottle={16} 
            onScroll={ScrollHandler} 
            contentContainerStyle={{paddingBottom:90}} 
            style={Styles.container}
            bounces={false}
        >
            {/* <CarouselComponent ScrollY={ScrollY} /> */}
            <CarouselComponent />
            <Animated.View style={[Styles.content]}  >
                <TrayComponent data={TrayData} label={'Continue Watching'} />
                <TrayComponent data={TrayData} label={'Trending Now'} />
                <TrayComponent data={TrayData} label={'Latest'} />
            </Animated.View>
        <Button title="Dispatch" onPress={() => dispatch({type:'CHECKY'})} />
        </Animated.ScrollView>
        </>
    )
}

const Styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.secondary
    },
    content:{
        backgroundColor:Colors.secondary,
    },
    statusBarGradient:{
        position:'absolute',
        zIndex:1,
        width:SCREEN_WIDTH,
        height:40,
    },
})

export default HomeScreen;



