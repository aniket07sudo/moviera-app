import React, { memo } from "react";
import { Animated, StyleSheet, View } from "react-native"
import { RegularText } from "../../../utils/Text";
import { SharedValue, interpolate, useAnimatedReaction, useAnimatedStyle, withTiming } from "react-native-reanimated";
import metrics from "../../../theme/metrics";

interface PlayerModalDialogProps {
    // children:React.ReactNode | JSX.Element | JSX.Element[];
    show:SharedValue<boolean>;
}

const PlayerModalDialog = ({show}:PlayerModalDialogProps) => {

    // const modalShow = 

    // useAnimatedReaction(
    //     () => show.value,
    //     () => {
    //         console.log("Shoe Value",show.value);
            
    //     }
    // )

    // const animatedStyles = useAnimatedStyle(() => {
    //     const opacity = withTiming
    //     return {
    //         opacity
    //     }
    // })

    // const 

    return (
        <Animated.View style={[Styles.container,{opacity:show.value ? 1 : 0}]} >
            <RegularText>hii</RegularText>
            {/* {children} */}
        </Animated.View>
    )
}

const Styles = StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject,
        top:0,
        left:0,
        right:0,
        bottom:0,
        zIndex:10,
        height:metrics.screenHeight ,
        backgroundColor:'red'
    }
})

export default memo(PlayerModalDialog);