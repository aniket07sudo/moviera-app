import { memo, useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, { Easing, runOnJS, runOnUI, useAnimatedReaction, useAnimatedStyle, useSharedValue, withDecay, withSpring, withTiming } from "react-native-reanimated";
import { Colors } from "../../theme/colors";
import { LayoutConfig } from "../../utils/layout";
import metrics from "../../theme/metrics";

interface BubbleProps {
    translateX:Animated.SharedValue<number>;
    maxValue:Animated.SharedValue<number>;
}

function BubbleImage({translateX,maxValue}:BubbleProps) {

    console.log("-------------- thumbSequence Rerender ------------------");

    // const seekableRangeX = useSharedValue(0);
    const maxTranslateX = useSharedValue(metrics.screenHeight - 40);
    const bubbleTranslateX = useSharedValue(0);


    useAnimatedReaction(
        () => translateX.value,
        () => {
            console.log("MAx",maxValue.value,translateX.value,maxTranslateX.value);
            bubbleTranslateX.value = translateX.value - LayoutConfig.videoPlayer.bubbleWidth / 2;
            if(translateX.value <= LayoutConfig.videoPlayer.bubbleWidth / 2) {
                bubbleTranslateX.value = 0;
            }
            if(translateX.value + LayoutConfig.videoPlayer.bubbleWidth / 2 >= maxTranslateX.value) {
                bubbleTranslateX.value = maxTranslateX.value - LayoutConfig.videoPlayer.bubbleWidth;
            }
        }
    )

    const [imgURL,setImgURL] = useState("http://192.168.0.104:3000/witch/thumb/output_001.jpg");

    // console.log("imgURL",imgURL);


    function updateImageUrl(data) {
        console.log("daaa",data);

        let formattedNumber = data.toLocaleString('en-US', {
            minimumIntegerDigits: 3,
            useGrouping: false
          })
        
        setImgURL(`http://192.168.0.104:3000/witch/thumb/output_${formattedNumber}.jpg`);
    }



    // useAnimatedReaction(
    //     () => {
    //         // console.log("Thum Value",thumbSequence.value);
    //         runOnJS(updateImageUrl)(thumbSequence.value)
            

    //     },
    //     () => {
            
    //     },
    // [])

    // const ImageRender = useMemo(() => (
    // ),[imgURL])

    const bubbleTranslateXStyle = useAnimatedStyle(() => {

        return {
            transform:[{translateX:bubbleTranslateX.value}]
        }
    })
    
    return (
        <View style={Styles.bubbleRange}  pointerEvents="none">
            <Animated.View style={[Styles.bubbleContainer,bubbleTranslateXStyle]}>
                <Image style={Styles.imageContainer} source={{uri:imgURL}} />
            </Animated.View>
        </View>
    )
}

const Styles = StyleSheet.create({
    bubbleRange:{
        width:metrics.screenHeight,
        // backgroundColor:'red',
        position:'absolute',
        bottom:0,
    },
    bubbleContainer:{
        // borderBottomColor:'red',
        // borderBottomWidth:2,
        width:LayoutConfig.videoPlayer.bubbleWidth,
        height:LayoutConfig.videoPlayer.bubbleHeight,
        backgroundColor:Colors.backgroundColor
    },
    imageContainer:{
        width:LayoutConfig.videoPlayer.bubbleWidth,
        height:LayoutConfig.videoPlayer.bubbleHeight
    }
})

export default memo(BubbleImage);