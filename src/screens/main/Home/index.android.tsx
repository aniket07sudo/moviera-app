import React, { useEffect, useState } from "react";
import { Dimensions,StyleSheet, Text, View , FlatList, ScrollView, Image, Button, StatusBar } from "react-native";
import { useTranslation } from "react-i18next";
import { Colors } from "../../../theme/colors";
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import CarouselComponent from "../../../components/Carousel";
import TrayComponent from "../../../components/Tray";
import { TrayData } from "./constants";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { CompositeScreenProps, useNavigation } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList, HomeScreenNavigationProps, HomeScreenProps, RootStackParamList } from "../../../ts/types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
const ITEM_WIDTH = SCREEN_WIDTH;

const ITEM_HEIGHT = Dimensions.get('screen').height * 0.68;


const HomeScreen = () => {

    // const AppState = useSelector(state => state);
    const dispatch = useDispatch();

    const navigation = useNavigation<HomeScreenProps['navigation']>();

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
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <ScrollView 
            // scrollEventThrottle={16} 
            // onScroll={ScrollHandler} 
            contentContainerStyle={{paddingBottom:90}} 
            style={Styles.container}
            // bounces={false}
        >
            <CarouselComponent />
            <LinearGradient style colors={['transparent',Colors.secondary]} />
            <View style={[Styles.content]}  >
                <TrayComponent navigation={navigation} data={TrayData} label={'Continue Watching'} />
                <TrayComponent navigation={navigation} data={TrayData} label={'Continue Watching'} />
            </View>
        </ScrollView>
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
    // linearF
})

export default HomeScreen;



