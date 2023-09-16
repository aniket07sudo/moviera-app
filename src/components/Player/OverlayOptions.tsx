import { ActivityIndicator, ActivityIndicatorComponent, Image, Pressable, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { MediumText, RegularText } from "../../utils/Text";
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, withTiming } from "react-native-reanimated";
import fonts from "../../theme/fonts";
import metrics from "../../theme/metrics";
import BottomOptions from "./bottomOptions";
import { RefObject, forwardRef, memo, useImperativeHandle, useRef } from "react";
import LottieView, { LottieViewProps } from "lottie-react-native";
import { Colors } from "../../theme/colors";

const HEADER_HEIGHT = 80;


interface OverlayOptionsProps {
    // isOptionsShown:Animated.SharedValue<number>,
    handleBack:() => void;
    handleTenSec:(s:string) => void;
    isBuffering:Animated.SharedValue<boolean>;
    togglePlay:() => void;
}

 const OverlayOptions = forwardRef(({handleTenSec,isBuffering,togglePlay,handleBack}:OverlayOptionsProps,ref) => {

    console.log("--------------------- [Overlay Options Render] ---------------------");

    useImperativeHandle(ref,() => ({
        play:() => {
            console.log("Logginf");
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
    

    return (
        <>
        <Animated.View style={[Styles.videoControls]}>
            <LinearGradient style={{...StyleSheet.absoluteFillObject,height:HEADER_HEIGHT,flexDirection:'row',top:0}} colors={['rgba(0,0,0,0.7)','transparent']} />
            <View style={Styles.headerContainer}>
                <View style={{flexDirection:'row',gap:20,alignItems:'center'}}>
                    <Pressable onPress={handleBack} style={Styles.cancelIcon}>
                        <Image style={{width:16,height:16}} source={require('../../assets/png/cross.png')} />
                    </Pressable>
                    <MediumText styles={{fontSize:fonts.size.font14}}>S1:E1 "The Beginning"</MediumText>
                </View>
                <Pressable style={{width:24,height:24}}>
                    <Image style={{width:22,height:22}} source={require('../../assets/png/padlock.png')} />
                </Pressable>
            </View>
            <View style={Styles.centerOptions}>
                <Pressable onPress={handleTenSec.bind(null,'backward')} style={Styles.screenOptions}>
                    <LottieView autoPlay ref={backRef} loop={false} resizeMode="contain" style={{width:'100%',height:'100%'}} source={require('../../assets/lottie_animations/back_video.json')} />
                </Pressable>
                <Pressable onPress={togglePlay} style={Styles.screenOptions}>
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
            <View style={Styles.bottomOptions}>
                <BottomOptions />
            </View>
        </Animated.View>
        </>
    )
})

const Styles = StyleSheet.create({
    headerContainer:{
        ...StyleSheet.absoluteFillObject,
        height:80,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:30,
        paddingRight:30,
        // zIndex:3
    },
    bottomOptions:{
        position:'absolute',
        right:0,
        left:0,
        bottom:0,
        zIndex:3
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
        ...StyleSheet.absoluteFillObject,
        zIndex:3
    },  
    centerOptions:{
        ...StyleSheet.absoluteFillObject,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
        height:50,
        top:(metrics.screenWidth / 2) - 25,
        // zIndex:3,
        // overflow:'hidden'

    },
    cancelIcon:{
        width:20,
        height:20
    },
})

export default memo(OverlayOptions);