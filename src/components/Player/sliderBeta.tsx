import { Dimensions, PanResponder, Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native"
import { LayoutConfig } from "../../utils/layout"
import { Gesture, GestureDetector, GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, TapGestureHandler  } from "react-native-gesture-handler"
import Animated, { Easing, interpolateColor, runOnJS, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import { RegularText } from "../../utils/Text";
import metrics from "../../theme/metrics";
import { Colors } from "../../theme/colors";
import MaskedView from "@react-native-masked-view/masked-view";
import Bubble from "./bubble";
import PlayerTimer from "./timer";
import React, { useEffect, useState } from "react";
import useScreenDimensions from "../../utils/useScreenDimensions";
import Orientation from "react-native-orientation-locker";
import { useSelector } from "react-redux";

const ThumbSize = 20;
const minValue = 0;


// if(Orientation.getDeviceOrientation() == 'PORTRAIT') {
//     VideoHeight = Dimensions.get('window').height;
// } else {
//     VideoHeight = Dimensions.get('window').width;
// }


interface SliderBeta {
    _onSlideComplete:(data:number) => void;
    sliderProgress:Animated.SharedValue<number>;
    maxValue:Animated.SharedValue<number>;
    seekable:Animated.SharedValue<number>;
    slideStart:() => void;
    isScrubbing:Animated.SharedValue<boolean>;
}

const SliderBeta = ({isScrubbing,seekable,slideStart,sliderProgress,_onSlideComplete,maxValue}:SliderBeta) => {

    const translateX = useSharedValue(0);
    const contextX = useSharedValue(0);
    let seekableX = useSharedValue(0);

    const bubbleIndex = useSharedValue(0);
    const [height, setHeight] = useState(Dimensions.get('window').height);
    const [width, setWidth] = useState(Dimensions.get('window').width);

    let VideoHeight = height > width ? height : width;
   

    console.log("Screen data",VideoHeight,width,height);

    useEffect(() => {
        // Function to update dimensions
        const updateDimensions = () => {
          setHeight(Dimensions.get('window').height);
          setWidth(Dimensions.get('window').width);
        };
    
        // Event listener to update dimensions when the screen size changes
        let dimensionListener = Dimensions.addEventListener('change', updateDimensions);
    
        // Cleanup the event listener when the component is unmounted
        return () => {
            dimensionListener.remove();
        };
      }, []);

    useAnimatedReaction(
        () => sliderProgress.value,
        () => {
            translateX.value = (sliderProgress.value / maxValue.value) * (VideoHeight - (ThumbSize * 2));
            seekableX.value = (seekable.value / maxValue.value) * (VideoHeight - (2 * ThumbSize));
            // console.log("Animated REaction",sliderProgress.value,translateX.value,seekable.value);
        },[seekable,sliderProgress,VideoHeight]
    )

    const animatedStyle = useAnimatedStyle(() => {
        
        return {
            transform:[{translateX:(translateX.value - ThumbSize / 2)},{scale:withTiming(isScrubbing.value ? 1.4 : 1)}],
        }
    }) 

    const animatedTintColor = useAnimatedStyle(() => {
        return {
            transform:[{translateX: 2 * ThumbSize + (translateX.value - VideoHeight)}] 
        }
    })

    const seekableAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform:[{translateX:2* ThumbSize + (seekableX.value - VideoHeight)}]
        }
    })

    const ScrubbingBubbleAnimation = useAnimatedStyle(() => {
        return {
            opacity:withTiming(isScrubbing.value ? 1 : 0)
        }
    }) 

    const panGestureEvent = Gesture.Pan()
    .onTouchesDown((event) => {
        console.log("event",event.allTouches,translateX.value);
        contextX.value = event.allTouches[0].absoluteX;
        const newValue = event.allTouches[0].absoluteX / (VideoHeight- 2 * ThumbSize) * maxValue.value;
        runOnJS(_onSlideComplete)(newValue);
        // _onSlideComplete(newValue);
    })
    .onStart(() => {
        contextX.value = translateX.value;
        isScrubbing.value = true;
        runOnJS(slideStart)();

    })
    .onUpdate((event) => {
        translateX.value = event.translationX + contextX.value;
        bubbleIndex.value = (Math.floor((translateX.value / (VideoHeight - ThumbSize * 2) * maxValue.value) / 5) * 5 / 5);

        if(translateX.value < 0) {
            translateX.value = 0;
        } else if(translateX.value >= VideoHeight - 2 * ThumbSize) {
            translateX.value = VideoHeight - 2 * ThumbSize;
        }

    }) 
    .onEnd(() => {
        
        if(translateX.value >= 0 && translateX.value <= VideoHeight - 2 * ThumbSize) {
            
            const newValue = translateX.value/ (VideoHeight - 2 * ThumbSize) * maxValue.value;
            runOnJS(_onSlideComplete)(newValue);
        }
        isScrubbing.value = false;
        
    }) 

    return (
        <>
        {/* <PlayerTimer sliderProgress={sliderProgress} /> */}
        <View style={Styles.sliderContainer}>
                <View style={{width:ThumbSize,height:10}} />
                <GestureHandlerRootView style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                <View style={[Styles.sliderTrack,{width:VideoHeight - ThumbSize * 2}]}>
                    <Animated.View style={[{position:'absolute',bottom:10},ScrubbingBubbleAnimation]}>
                        <Bubble bubbleIndex={bubbleIndex} maxValue={maxValue} translateX={translateX} />
                    </Animated.View>
                    <MaskedView style={StyleSheet.absoluteFill} maskElement={<Animated.View style={{width:VideoHeight,height:4,backgroundColor:Colors.primary}} />}>
                        <Animated.View style={[Styles.completedTintColor,animatedTintColor]} />
                        <Animated.View style={[Styles.seekable,seekableAnimatedStyle,{width:VideoHeight - ThumbSize * 2}]} />
                    </MaskedView>
                    <GestureDetector gesture={panGestureEvent} >
                        <Animated.View style={Styles.seekArea}>
                            <Animated.View style={[Styles.thumb,animatedStyle]} />
                        </Animated.View>
                    </GestureDetector>
                </View>
                </GestureHandlerRootView>
            </View>
        </>
    )
}

const Styles = StyleSheet.create({
    sliderContainer:{
        position:'absolute',
        // ...StyleSheet.absoluteFillObject,
        // top:0,
        right:0,
        // bottom:0,
        // width:200,
        bottom:LayoutConfig.videoPlayer.bottomOptions,
        height:20,
        left:0,
        flexDirection:'row',
        zIndex:4,
        // justifyContent:'center',
        // alignItems:'center',
        // zIndex:4,
        // backgroundColor:'red'
    },
    sliderTrack:{
        position:'absolute',
        height:3,
        zIndex:3,
        // zIndex:0,
        // width:VideoHeight - ThumbSize * 2, /// 
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:"rgba(147,134,120,0.6)",
    },
    seekArea:{
        height:30,
        flexDirection:'column',
        justifyContent:'center',
    },
    thumb:{
        // zIndex:5,
        zIndex:0,
        width:ThumbSize,
        height:ThumbSize,
        backgroundColor:Colors.primary,
        borderRadius:15,
    },
    completedTintColor:{
        ...StyleSheet.absoluteFillObject,
        height:4,
        
        backgroundColor:Colors.primary,
        zIndex:3,
        // zIndex:0,
    },
    seekable:{
        height:3,
        position:'absolute',
        left:0,
        right:0,
        zIndex:2,
        // zIndex:0,
        // width:VideoHeight - ThumbSize * 2,
        backgroundColor:"rgba(147,134,120,0.6)",
    },
})

export default SliderBeta;