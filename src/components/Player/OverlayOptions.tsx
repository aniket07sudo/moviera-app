import { ActivityIndicator, ActivityIndicatorComponent, Image, Pressable, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { MediumText, RegularText } from "../../utils/Text";
import Animated, { interpolate, useAnimatedStyle, useDerivedValue } from "react-native-reanimated";
import fonts from "../../theme/fonts";
import metrics from "../../theme/metrics";
import BottomOptions from "./bottomOptions";
import { RefObject, forwardRef, memo, useImperativeHandle, useRef } from "react";
import LottieView, { LottieViewProps } from "lottie-react-native";

const HEADER_HEIGHT = 80;

// const BufferingComponent = Animated.createAnimatedComponent(ActivityIndicatorComponent);


interface OverlayOptionsProps {
    // isOptionsShown:Animated.SharedValue<number>,
    handleBack:() => void;
    handleTenSec:(s:string) => void;
    isBuffering:Animated.SharedValue<number>;
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
        }
    }))

    const playPauseRef = useRef<LottieView | null>(null);

    const animatePause = useAnimatedStyle(() => {
        // const scale = interpolate(videoPlay.value,[0,1],[1,1.5])
        const opacity = interpolate(isBuffering.value,[0,1],[1,0]);

        return {
            // transform:[{scale}],
            opacity
        }
    })

    const BufferingAnimation = useAnimatedStyle(() => {
        const opacity = interpolate(isBuffering.value,[0,1],[0,1]);
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
                    <Image style={{width:44,height:44}} source={require('../../assets/png/back.png')} />
                </Pressable>
                <Pressable onPress={togglePlay} style={Styles.screenOptions}>
                    <Animated.View style={[animatePause,StyleSheet.absoluteFillObject,{overflow:'hidden'}]}>
                        <LottieView resizeMode="contain" speed={1.5} loop={false} ref={playPauseRef} style={{width:44,height:44,transform:[{scale:3.1}]}} source={require('../../assets/lottie.json')} />
                    </Animated.View>
                    <Animated.View style={[BufferingAnimation]}>
                        <ActivityIndicator size={'large'} color={'white'}  />
                    </Animated.View>
                </Pressable>
                <Pressable onPress={handleTenSec.bind(null,'forward')} style={Styles.screenOptions}>
                    <Image style={{width:44,height:44}} resizeMode='contain'  source={require('../../assets/png/forward.png')} />
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
        // position:'absolute',
        // top:0,
        // left:0,
        // right:0,
        ...StyleSheet.absoluteFillObject,
        // bottom:0,
        height:80,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:30,
        paddingRight:30,
        zIndex:3
    },
    bottomOptions:{
        position:'absolute',
        // ...StyleSheet.absoluteFillObject,
        // height:100,
        // flex:1,
        right:0,
        left:0,
        // backgroundColor:'blue',
        bottom:0,
        zIndex:3

        // top:100,
        // backgroundColor:'green'
    },
    mainCenterIcon:{
        position:'absolute',
        
    },
    screenOptions:{
        width:44,
        height:44,
        // overflow:'hidden',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor:'red',
        position:'relative'
    },
    videoControls:{
        // position:'relative'
        ...StyleSheet.absoluteFillObject,
        // backgroundColor:'red'
        // zIndex:3,
        // backgroundColor:'red',
        // width:metrics.screenHeight,
        // backgroundColor:'red'
    },  
    centerOptions:{
        ...StyleSheet.absoluteFillObject,
        // backgroundColor:'green',
        flexDirection:'row',
        justifyContent:'space-evenly',
        height:50,
        top:(metrics.screenWidth / 2) - 25,
        zIndex:3

    },
    cancelIcon:{
        width:20,
        height:20
    },
})

export default memo(OverlayOptions);