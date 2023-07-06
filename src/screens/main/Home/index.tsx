import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground,StatusBar,StyleSheet, Text, View , FlatList, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { RegularText , BoldText, SemiBold, MediumText } from "../../../utils/Text";
import fonts from "../../../theme/fonts";
import {Data} from './HeroData'
import { Colors } from "../../../theme/colors";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import CarouselItem from "./item";
import LinearGradient from "react-native-linear-gradient";


const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;

const ITEM_HEIGHT = SCREEN_HEIGHT * 0.65;


const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
// const AnimatedSVG = Animated.createAnimatedComponent(Svg);


const HomeScreen = ({navigation}) => {
    const ScrollX = useSharedValue<number>(0);

    const ScrollHandler = useAnimatedScrollHandler({
        onScroll:(event) => {
            ScrollX.value = event.contentOffset.x
        }
    })
    
    return (
        <View>
        <StatusBar barStyle={'light-content'} />
        <LinearGradient colors={[Colors.secondary,'transparent']} style={Styles.statusBarGradient} />
            <AnimatedFlatlist
                data={Data}
                horizontal
                snapToInterval={SCREEN_WIDTH}
                decelerationRate={0}
                bounces={false}
                renderToHardwareTextureAndroid
                scrollEventThrottle={16}
                keyExtractor={(item,index) => index.toString()}
                onScroll={ScrollHandler}
                showsHorizontalScrollIndicator={false}
                renderItem={({item,index}) => (
                    <CarouselItem key={index} item={item} index={index} ScrollX={ScrollX} />
                )}
            />
            <View style={Styles.dotsContainer}>
                <Animated.View>

                </Animated.View>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    dotsContainer:{
        
    },
    statusBarGradient:{
        position:'absolute',
        zIndex:1,
        width:SCREEN_WIDTH,
        height:40
    },
})

export default HomeScreen;



