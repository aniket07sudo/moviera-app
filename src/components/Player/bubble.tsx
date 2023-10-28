import { memo, useEffect, useMemo, useState } from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import React from "react";
import Animated, { Easing, interpolate, runOnJS, runOnUI, useAnimatedReaction, useAnimatedStyle, useDerivedValue, useSharedValue, withDecay, withSpring, withTiming , SharedValue } from "react-native-reanimated";
import { Colors } from "../../theme/colors";
import { LayoutConfig } from "../../utils/layout";
import metrics from "../../theme/metrics";
import { RegularText } from "../../utils/Text";
import MaskedView from "@react-native-masked-view/masked-view";

interface BubbleProps {
    translateX:SharedValue<number>;
    maxValue:SharedValue<number>;
    bubbleIndex:SharedValue<number>;
}

interface bubbleImagesType {
    [key:number]:string
}

const AnimatedImageBackground = Animated.createAnimatedComponent(ImageBackground);

const bubbleImages : bubbleImagesType = {
    0:'http://192.168.0.102:3000/witcher/thumb/output_0.jpg',
    1:'http://192.168.0.102:3000/witcher/thumb/output_1.jpg',
    2:'http://192.168.0.102:3000/witcher/thumb/output_2.jpg',
    3:'http://192.168.0.102:3000/witcher/thumb/output_3.jpg',
    4:'http://192.168.0.102:3000/witcher/thumb/output_4.jpg',
    5:'http://192.168.0.102:3000/witcher/thumb/output_5.jpg',
    6:'http://192.168.0.102:3000/witcher/thumb/output_6.jpg',
    7:'http://192.168.0.102:3000/witcher/thumb/output_7.jpg',
}

function BubbleImage({translateX,maxValue,bubbleIndex}:BubbleProps) {

    console.log("-------------- thumbSequence Rerender ------------------");

    const maxTranslateX = useSharedValue(metrics.screenHeight - 40);
    const bubbleTranslateX = useSharedValue(0);
    const [imgURL,setImgURL] = useState("http://192.168.0.104:3000/witch/thumb/output_2.jpg");

    useAnimatedReaction(
        () => translateX.value,
        () => {
            // console.log("MAx",maxValue.value,translateX.value,maxTranslateX.value);
            bubbleTranslateX.value = translateX.value - LayoutConfig.videoPlayer.bubbleWidth / 2;
            if(translateX.value <= LayoutConfig.videoPlayer.bubbleWidth / 2) {
                bubbleTranslateX.value = 0;
            }
            if(translateX.value + LayoutConfig.videoPlayer.bubbleWidth / 2 >= maxTranslateX.value) {
                bubbleTranslateX.value = maxTranslateX.value - LayoutConfig.videoPlayer.bubbleWidth;
            }
            
            if(bubbleIndex.value > 100) {
                console.log("Bubble Index",bubbleIndex.value,Math.floor(bubbleIndex.value / 100));
                runOnJS(setImgURL)(bubbleImages[Math.floor(bubbleIndex.value / 100)]);
                bubbleIndex.value = bubbleIndex.value % 100;
            }
            
        },[]
    )

    const bubbleTranslateXStyle = useAnimatedStyle(() => {
        
        return {
            transform:[{translateX:bubbleTranslateX.value}]
        }
    })
    
    const PreviewMapperStyle = useAnimatedStyle(() => {
        
        const row = Math.floor(bubbleIndex.value / 10);
        const col = Math.floor(bubbleIndex.value % 10);
        console.log("Row : ",row,bubbleIndex.value);
        console.log("Col : ",col);

        
        return {
            transform:[{translateX:-320 * col},{translateY:-180 * row}],
        }
    },[])

    return (
        <View style={Styles.bubbleRange} pointerEvents="none">
            <Animated.View style={[Styles.bubbleContainer,bubbleTranslateXStyle]}>
                <AnimatedImageBackground resizeMode="cover" style={[Styles.imageContainer,PreviewMapperStyle]} imageStyle={Styles.imageStyle} source={{uri:imgURL}} />
            </Animated.View>
        </View>
    )
}

const Styles = StyleSheet.create({
    bubbleRange:{
        width:metrics.screenHeight,
        position:'absolute',
        bottom:0,
    },
    bubbleContainer:{
        width:320,
        height:180,
        // width:LayoutConfig.videoPlayer.bubbleWidth,
        // height:LayoutConfig.videoPlayer.bubbleHeight,
        backgroundColor:Colors.backgroundColor,
        overflow:'hidden',
    },
    imageStyle:{
        // width:'100%',
        // height:1800,
        // flex:1,
    },
    imageContainer:{
        width:3200,
        height:1800,
    }
})

export default memo(BubbleImage);