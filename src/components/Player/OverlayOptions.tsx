import { ActivityIndicator, ActivityIndicatorComponent, Image, Platform, Pressable, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { MediumText, RegularText } from "../../utils/Text";
import Animated, { SharedValue, interpolate, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import fonts from "../../theme/fonts";
import metrics from "../../theme/metrics";
import BottomOptions from "./bottomOptions";
import { RefObject, forwardRef, memo, useImperativeHandle, useRef, useState } from "react";
import LottieView, { LottieViewProps } from "lottie-react-native";
import { Colors } from "../../theme/colors";
import BottomSheet from "../BottomSheet";
import PlayerModalDialog from "./playerModalDialog";
import React from "react";
import {RectButton, TapGestureHandler} from 'react-native-gesture-handler'

const HEADER_HEIGHT = 80;


interface OverlayOptionsProps {
    // isOptionsShown:Animated.SharedValue<number>,
    handleBack:() => void;
    handleTenSec:(s:string) => void;
    isBuffering:SharedValue<boolean>;
    togglePlay:() => void;
    isScrubbing:SharedValue<boolean>;
    height:number;
    width:number;
}

 const OverlayOptions = forwardRef(({isScrubbing,handleTenSec,isBuffering,togglePlay,handleBack,height,width}:OverlayOptionsProps,ref) => {

    console.log("--------------------- [Overlay Options Render] ---------------------");
    // const [playerState,setPlayerState] = useState({
    //     audioSubtitle:false,
    //     quality:false,
    //     speed:false,
    //     episodes:false
    // });

    const audioSubtitles = useSharedValue<boolean>(false);


    useImperativeHandle(ref,() => ({
        play:() => {
            // console.log("Logginf");
            if(playPauseRef.current) {
                playPauseRef.current.play(40,20);
            }
        },
        pause:() => {
            if(playPauseRef.current) {
                playPauseRef.current.play(30,40);
            }
        },
        backward:() => {
            if(backRef.current) {
                backRef.current.play(0,30);
            }
        },
        forward:() => {
            if(forwardRef.current) {
                forwardRef.current.play(0,30);
            }
        }
    }))

    const playPauseRef = useRef<LottieView | null>(null);
    const backRef = useRef<LottieView | null>(null);
    const forwardRef = useRef<LottieView | null>(null);

    const animatePause = useAnimatedStyle(() => {
        const isVisible = Number(isBuffering.value) == 1 ? 0 : 1;
        const opacity = withTiming(isVisible);
        return {
            opacity
        }
    })



    const BufferingAnimation = useAnimatedStyle(() => {
        const isVisible = Number(isBuffering.value) == 1 ? 1 : 0;
        const opacity = withTiming(isVisible);
        return {
            opacity
        }
    })    

    const scrubbingAnimation = useAnimatedStyle(() => {

        return {
            opacity:withTiming(isScrubbing.value ? 0 : 1)
        }
    })


    return (
        <>
        <Animated.View style={[Styles.videoControls,scrubbingAnimation,{height}]}>
            <LinearGradient style={{...StyleSheet.absoluteFillObject,height:HEADER_HEIGHT,flexDirection:'row',top:0,width}} colors={['rgba(0,0,0,0.7)','transparent']} />
            <View pointerEvents="box-none" style={[Styles.headerContainer,{width}]}>
                <View style={{flexDirection:'row',gap:10,alignItems:'center'}}>
                    <Pressable onPress={handleBack} style={Styles.cancelIcon}>
                        <Image style={{width:16,height:16}} source={require('../../assets/png/cross.png')} />
                    </Pressable>
                    <MediumText styles={{fontSize:fonts.size.font14}}>S1:E1 "The Beginning"</MediumText>
                </View>
                <Pressable style={Styles.screenLock}>
                    <Image style={{width:22,height:22}} source={require('../../assets/png/padlock.png')} />
                </Pressable>
            </View>
            <View pointerEvents="box-none" style={[Styles.centerOptions,{width}]}>
                    <Pressable  onPress={handleTenSec.bind(null,'backward')} style={Styles.screenOptions}>
                        <LottieView autoPlay ref={backRef} loop={false} resizeMode="contain" style={{width:'100%',height:'100%'}} source={require('../../assets/lottie_animations/back_video.json')} />
                    </Pressable>
                <Pressable hitSlop={{ top: 25, bottom: 25, left: 35, right: 35 }} onPress={togglePlay} style={Styles.screenOptions}>
                    <Animated.View style={[animatePause,StyleSheet.absoluteFillObject,{overflow:'hidden',flexDirection:'row',justifyContent:'center',alignItems:'center'}]}>
                        <LottieView resizeMode="contain" speed={2} loop={false} ref={playPauseRef} style={{width:44,height:44,transform:[{scale:3.1}]}} source={require('../../assets/lottie.json')} />
                    </Animated.View>
                    <Animated.View style={[BufferingAnimation]}>
                        <ActivityIndicator size={'large'} color={Colors.primary}  />
                    </Animated.View>
                </Pressable>
                <Pressable onPress={handleTenSec.bind(null,'forward')} style={Styles.screenOptions}>
                    <LottieView autoPlay ref={forwardRef} resizeMode="contain" loop={false} style={{width:'100%',height:'100%'}} source={require('../../assets/lottie_animations/forward_video.json')} />
                </Pressable>
            </View>
            <View pointerEvents="none" style={[Styles.bottomOptions,{width}]}>
                <BottomOptions show={audioSubtitles} />
            </View>
        </Animated.View>
        </>
    )
})

const Styles = StyleSheet.create({
    headerContainer:{
        // ...StyleSheet.absoluteFillObject,
        position:'absolute',
        right:0,
        top:0,
        left:0,
        // width:600,
        height:80,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        ...Platform.select({
            ios:{
                paddingLeft:10,
            }
        }),
        // zIndex:4,
        zIndex:0,
    },
    bottomOptions:{
        position:'absolute',
        bottom:0,
        right:0,
        left:0,
        // zIndex:5,
        zIndex:0,
        // backgroundColor:'green',
    },
    mainCenterIcon:{
        position:'absolute',
    },
    screenOptions:{
        width:50,
        height:50,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        position:'relative'
    },
    videoControls:{
        // ...StyleSheet.absoluteFillObject,
        // zIndex:5
        position:'absolute',
        right:0,
        left:0,
        bottom:0,
        top:0,
        // backgroundColor:'green',
        zIndex:6,
    },  
    centerOptions:{
        ...StyleSheet.absoluteFillObject,
        // backgroundColor:'green',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        height:50,
        top:(metrics.screenWidth / 2) - 25,
        zIndex:4,
        // position:'absolute',
        // bottom:0,
        // top:10,
        // right:0,
        // left:0,
        // height:100,
        // backgroundColor:'green',
        // zIndex:5
    },
    cancelIcon:{
        width:20,
        height:20,
        padding:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    screenLock:{
        width:24,
        height:24,
        marginRight:10,
        padding:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default memo(OverlayOptions);