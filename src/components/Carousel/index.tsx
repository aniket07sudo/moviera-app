import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground,StatusBar,StyleSheet, Text, View , FlatList, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import CarouselItem from "./item";
import LinearGradient from "react-native-linear-gradient";
import { Data } from "../../screens/main/Home/HeroData";
import { Colors } from "../../theme/colors";
import DotsComponent from "./dots";

const SCREEN_WIDTH = Dimensions.get('screen').width;
const ITEM_WIDTH = SCREEN_WIDTH;

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const CarouselComponent = () => {
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
            <View style={Styles.carouselContainer}>
                <AnimatedFlatlist
                    data={Data}
                    horizontal
                    snapToInterval={ITEM_WIDTH}
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
                    <View style={Styles.dotsWrapper}>
                        {Data.map((item,index) => (
                            <DotsComponent key={index} ScrollX={ScrollX} index={index} />
                        ))}
                    </View>
                </View>
            </View>
            
        </View>
    )
}

const Styles = StyleSheet.create({
    dotsContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        position:'absolute',
        bottom:20
    },
    carouselContainer:{
        position:'relative'
    },
    dotsWrapper:{
        flexDirection:'row',
        gap:10,
        // backgroundColor:'red',
        width:5 * 20,
        justifyContent:'center'
    },
    statusBarGradient:{
        position:'absolute',
        zIndex:1,
        width:SCREEN_WIDTH,
        height:40
    },
})

export default CarouselComponent;



