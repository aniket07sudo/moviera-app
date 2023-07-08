import React from "react";
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";

interface DotsProps {
    ScrollX:Animated.SharedValue<number>,
    index:number
}

const SCREEN_WIDTH = Dimensions.get('screen').width;
const ITEM_WIDTH = SCREEN_WIDTH;

const DotsComponent = ({ScrollX,index}:DotsProps) => {

    const inputRange = [(index - 1) * ITEM_WIDTH,index * ITEM_WIDTH,(index + 1) * ITEM_WIDTH];

    const animatedDotsStyle = useAnimatedStyle(() => {

        return {
            width:interpolate(ScrollX.value,inputRange,[10,18,10],{ extrapolateRight:Extrapolation.CLAMP ,extrapolateLeft:Extrapolation.CLAMP }),
            backgroundColor:interpolateColor(ScrollX.value,inputRange,[Colors.grey,Colors.primary,Colors.grey])
        }
    });

    return (
        <Animated.View style={[Styles.dotsContainer,animatedDotsStyle]} />
    )
}

const Styles = StyleSheet.create({
    dotsContainer:{
        width:10,
        height:10,
        borderRadius:20,
        backgroundColor:Colors.grey,
    },
})

export default DotsComponent;