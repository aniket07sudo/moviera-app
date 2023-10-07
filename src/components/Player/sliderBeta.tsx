import { Dimensions, PanResponder, Pressable, StyleSheet, Text, View } from "react-native"
import { LayoutConfig } from "../../utils/layout"
import { Gesture, GestureDetector, GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, TapGestureHandler  } from "react-native-gesture-handler"
import Animated, { Easing, interpolateColor, runOnJS, useAnimatedGestureHandler, useAnimatedReaction, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import { RegularText } from "../../utils/Text";
import metrics from "../../theme/metrics";
import { Colors } from "../../theme/colors";
import MaskedView from "@react-native-masked-view/masked-view";

const ThumbSize = 20;
const minValue = 0;

interface SliderBeta {
    _onSlideComplete:(data:number) => void;
    sliderProgress:Animated.SharedValue<number>;
    maxValue:Animated.SharedValue<number>;
    seekable:Animated.SharedValue<number>;
    slideStart:() => void;
    isScrubbing:Animated.SharedValue<boolean>;
}

// const VideoHeight = Dimensions.get('window').width;
const VideoHeight = metrics.screenHeight

 const SliderBeta = ({isScrubbing,seekable,slideStart,sliderProgress,_onSlideComplete,maxValue}:SliderBeta) => {

    const translateX = useSharedValue(0);
    const contextX = useSharedValue(0);
    let seekableX = useSharedValue(0);


    useAnimatedReaction(
        () => sliderProgress.value,
        () => {
            translateX.value = (sliderProgress.value / maxValue.value) * (VideoHeight - ThumbSize * 2);
            seekableX.value = (seekable.value / maxValue.value) * (VideoHeight - 2 * ThumbSize);

            console.log("Animated REaction",sliderProgress.value,translateX.value,seekable.value);
        },[seekable,sliderProgress]
    )

    const animatedStyle = useAnimatedStyle(() => {
        
        return {
            // transform:[{translateX:withTiming(translateX.value,{duration:.5,easing:Easing.inOut(Easing.ease)})}],
            transform:[{translateX:(translateX.value - ThumbSize / 2)}],
        }
    }) 

    const animatedTintColor = useAnimatedStyle(() => {
        // const backgroundColor = interpolateColor(translateX.value,[ThumbSize,200],['transparent',Colors.primary])
        return {
            // backgroundColor,
            transform:[{translateX: 2 * ThumbSize + (translateX.value - VideoHeight)}]
        }
    })

    const seekableAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform:[{translateX:2* ThumbSize + (seekableX.value - VideoHeight)}]
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

        if(translateX.value < 0) {
            translateX.value = 0;
        } else if(translateX.value >= VideoHeight - 2 * ThumbSize) {
            translateX.value = VideoHeight - 2 * ThumbSize;
        }
        
        console.log("Translation X Value : ",translateX.value,VideoHeight - 2 * ThumbSize);

    }) 
    .onEnd((event) => {
        // console.log("Event",event);
        
        // const newValue = translateX.value / (VideoHeight - 2 * ThumbSize);
        // const actualValue = newValue * maxValue.value;
        // runOnJS(_onSlideComplete)(actualValue);
        console.log("Value",event.absoluteX);
        if(translateX.value >= 0 && translateX.value <= VideoHeight - 2 * ThumbSize) {
            
            const newValue = translateX.value/ (VideoHeight - 2 * ThumbSize) * maxValue.value;
            runOnJS(_onSlideComplete)(newValue);
        }
        isScrubbing.value = false;
        
    }) 
    
    

    return (
        <View style={Styles.sliderContainer}>
            <View style={{width:ThumbSize,height:10}} />
                <GestureHandlerRootView style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                <View style={Styles.sliderTrack} >
                    <MaskedView style={StyleSheet.absoluteFill} maskElement={<Animated.View style={{width:VideoHeight,height:4,backgroundColor:'black'}} />}>
                        <Animated.View style={[Styles.completedTintColor,animatedTintColor,{backgroundColor:Colors.primary}]} />
                        <Animated.View style={[Styles.seekable,seekableAnimatedStyle]} />
                    </MaskedView>
                    <GestureDetector gesture={panGestureEvent} >
                        <Animated.View style={Styles.seekArea}>
                            <Animated.View style={[Styles.thumb,animatedStyle]} />
                        </Animated.View>
                    </GestureDetector>
                </View>
                </GestureHandlerRootView>
            </View>
    )
}

const Styles = StyleSheet.create({
    sliderContainer:{
        // height:3,
        position:'absolute',
        right:0,
        bottom:LayoutConfig.videoPlayer.bottomOptions,
        left:0,
        zIndex:3,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    sliderTrack:{
        // ...StyleSheet.absoluteFillObject,
        position:'absolute',
        left:0,
        right:0,
        height:3,
        zIndex:3,
        width:VideoHeight - ThumbSize * 2,
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:"rgba(147,134,120,0.6)",
        // overflow:'hidden'
    },
    seekArea:{
        height:30,
        flexDirection:'column',
        justifyContent:'center',
        // backgroundColor:'transparent',
        // backgroundColor:"rgba(147,134,120,0.6)",
        // width:VideoHeight,
    },
    thumb:{
        // ...StyleSheet.absoluteFillObject,
        // position:'absolute',
        // top:-ThumbSize / 2,
        zIndex:5,
        width:ThumbSize,
        height:ThumbSize,
        backgroundColor:Colors.primary,
        borderRadius:15,
    },
    completedTintColor:{
        
        // position:'absolute',
        // width:VideoHeight - ThumbSize * 2,
        ...StyleSheet.absoluteFillObject,
        // position:'absolute',
        // left:ThumbSize,
        height:4,
        zIndex:3,
        // backgroundColor:Colors.primary,
        // backgroundColor:'red',
    },
    seekable:{
        height:3,
        position:'absolute',
        left:0,
        right:0,
        zIndex:2,
        width:VideoHeight - ThumbSize * 2,
        backgroundColor:"rgba(147,134,120,0.6)",
    },
})

export default SliderBeta;