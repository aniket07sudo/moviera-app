import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground,StatusBar,StyleSheet, Text, View , FlatList, ScrollView, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { RegularText , BoldText, SemiBold, MediumText } from "../../../utils/Text";
import fonts from "../../../theme/fonts";
import {Data} from './HeroData'
import { Colors } from "../../../theme/colors";
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import CarouselComponent from "../../../components/Carousel";
import TrayComponent from "../../../components/Tray";
import { TrayData } from "./constants";

const SCREEN_WIDTH = Dimensions.get('screen').width;
const ITEM_WIDTH = SCREEN_WIDTH;



const HomeScreen = () => {
    
    return (
        <ScrollView style={Styles.container}>
            <CarouselComponent />
            <TrayComponent data={TrayData} label={'Trending Now'} />
            <TrayComponent data={TrayData} label={'Latest'} />
            {/* <TrayComponent label={'Trending Now'} />
            <TrayComponent label={'Trending Now'} /> */}
        </ScrollView>
    )
}

const Styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.secondary
    },
 
})

export default HomeScreen;



