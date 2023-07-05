import React from "react";
import { Dimensions, Image, ImageBackground, StyleSheet, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
import { DataProps } from "./HeroData";
import MaskedView from "@react-native-masked-view/masked-view";
import { Rect, Svg } from "react-native-svg";
// import { Image } from "react-native-svg";

const ITEM_HEIGHT = Dimensions.get('screen').height * 0.65;
const SCREEN_WIDTH = Dimensions.get('screen').width;

const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);
const AnimatedSVG = Animated.createAnimatedComponent(Svg);

interface ItemProps {
    item:DataProps,
    index:number,
    ScrollX:Animated.SharedValue<number>
}

const CarouselItem = ({item,index,ScrollX}:ItemProps) => {

    // const animatedStyle = useAnimatedStyle(() => {
    //     return {
    //         transform:[{ translateX:interpolate(ScrollX.value, [(index - 2) * SCREEN_WIDTH,(index - 1) * SCREEN_WIDTH], [-SCREEN_WIDTH,0]), }]
    //     };
    //   });

    const translateX = interpolate(ScrollX.value,
        [(index - 1) * SCREEN_WIDTH,index * SCREEN_WIDTH,(index + 1) * SCREEN_WIDTH],
        [-SCREEN_WIDTH * 0.8,0,SCREEN_WIDTH * 0.8]
    )

    return (
        <View style={{width:SCREEN_WIDTH,justifyContent:'center',alignItems:'center'}}>
            <View style={{width:SCREEN_WIDTH,height:ITEM_HEIGHT,overflow:'hidden',alignItems:'center'}}>
                <Animated.Image style={[Styles.imageContainer,{transform:[{translateX}]}]} source={require('../../../assets/images/Hero.jpeg')} />
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    itemContainer:{
        position:'relative',
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
        width:SCREEN_WIDTH,
        height:ITEM_HEIGHT,
    },
    imageContainer:{
        width:SCREEN_WIDTH,
        height:ITEM_HEIGHT,
        resizeMode:'cover'
    }
})

export default CarouselItem;