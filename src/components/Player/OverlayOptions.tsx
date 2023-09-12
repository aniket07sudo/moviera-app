import { ActivityIndicator, ActivityIndicatorComponent, Image, Pressable, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { MediumText, RegularText } from "../../utils/Text";
import Animated, { interpolate, useAnimatedStyle, useDerivedValue } from "react-native-reanimated";
import fonts from "../../theme/fonts";
import metrics from "../../theme/metrics";
import BottomOptions from "./bottomOptions";
import { memo } from "react";

const HEADER_HEIGHT = 80;

// const BufferingComponent = Animated.createAnimatedComponent(ActivityIndicatorComponent);


interface OverlayOptionsProps {
    // isOptionsShown:Animated.SharedValue<number>,
    handleBack:() => void;
    handleTenSec:(s:string) => void;
    isBuffering:Animated.SharedValue<number>;
    togglePlay:() => void;
}

 function OverlayOptions({handleTenSec,isBuffering,togglePlay,handleBack}:OverlayOptionsProps) {

    console.log("--------------------- [Overlay Options Render] ---------------------");

    // console.log("videoPlay",videoPlay.value);

    // // const renderButton = useMem

    // const animatePlay = useAnimatedStyle(() => {
    //     const scale = interpolate(videoPlay.value,[0,1,0],[0.7,1,0.7])
    //     return {
    //         // transform:[{scale}],
    //         opacity:videoPlay.value == 1 ? 0 : 1
    //     }
    // })

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
            <View style={Styles.headerContainer}>
                <LinearGradient style={{...StyleSheet.absoluteFillObject,height:HEADER_HEIGHT,flexDirection:'row',top:0}} colors={['rgba(0,0,0,0.5)','transparent']} />
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
                    {/* <RegularText>PLay</RegularText> */}
                    <Animated.Image resizeMode={'contain'} style={[{width:44,height:44},Styles.mainCenterIcon,animatePause]} source={require('../../assets/png/player/pause.png')} />
                    {/* <Animated.Image style={[{width:44,height:44},animatePlay,Styles.mainCenterIcon]} resizeMode={'contain'} source={require('../../assets/png/video_play.png')} /> */}

                    {/* {videoPlay.value ? <Animated.Image resizeMode={'contain'} style={{width:48,height:48}} source={require('../../assets/png/player/pause.png')} /> : <Image style={{width:44,height:44}} resizeMode={'contain'} source={require('../../assets/png/video_play.png')} />} */}
                    {/* <Animated.Image resizeMode={'contain'} style={{width:48,height:48}} source={require('../../assets/png/player/pause.png')} />  */}
                    <Animated.View style={[BufferingAnimation]}>
                        <ActivityIndicator size={'large'} color={'white'}  />
                        {/* <ActivityIndicatorComponent size={'large'} /> */}
                    </Animated.View>
                    {/* <BufferingComponent style={[BufferingAnimation]} color={'white'} size={'large'} /> */}
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
}

const Styles = StyleSheet.create({
    headerContainer:{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        height:80,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:30,
        paddingRight:30,
    },
    bottomOptions:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        height:100
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
        alignItems:'center'
    },
    videoControls:{
        // ...StyleSheet.absoluteFillObject,
        // zIndex:2,
        width:metrics.screenHeight,
        // backgroundColor:'red'
    },  
    centerOptions:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        position:'absolute',
        height:50,
        right:0,
        left:0,
        top:(metrics.screenWidth / 2) - 25,
        bottom:-100,
    },
    cancelIcon:{
        width:20,
        height:20
    },
})

export default memo(OverlayOptions);