import { Alert, Button, Image, Modal, Platform, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import { PanGestureHandler, TapGestureHandler ,  } from 'react-native-gesture-handler';
import Animated, { cancelAnimation, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import VideoPlayer from 'react-native-video'
import metrics from '../../theme/metrics';
import { MediumText } from '../../utils/Text';
import { useEffect, useRef, useState } from 'react';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../ts/interfaces';
import { Colors } from '../../theme/colors';
import LinearGradient from 'react-native-linear-gradient';

export default function Player() {

    const modalVisible = useSelector((state:IAppState) => state.ui.playerModal);
    const dispatch = useDispatch();
    const videoRef = useRef();
    const isOptionsShown = useSharedValue(0);

    const navigation = useNavigation();

    console.log("Modal Visible",modalVisible);
    

    useEffect(() => {
        videoRef.current.presentFullscreenPlayer();
        Orientation.lockToLandscapeLeft();
        console.log("Initial Orientation",Orientation.getInitialOrientation());
        if(Orientation.getInitialOrientation() == 'PORTRAIT') {
            Orientation.lockToLandscapeLeft();
        console.log("After Orientation",Orientation.getInitialOrientation());

        }
        return () => {
        // Orientation.lockToPortrait();
        Orientation.lockToPortrait();
            // Orientation.removeOrientationListener(handleOrientation);
        }
    },[])

    const ErrorHandle = (e) => {
        console.log("Handle",e);
    }

    const handleBack = () => {
        navigation.goBack();
    }

    const activateHandle = () => {
        // console.log("Handle");
        console.log("Shared Value Before",isOptionsShown.value);
        // if(isOptionsShown.value == 1) {
        //     isOptionsShown.value = withTiming(0);
        //     return;
        // }
        
        isOptionsShown.value = withSequence(withTiming(1,{duration:500}),withDelay(2000,withTiming(0,{duration:600})));
        console.log("Shared Value After",isOptionsShown.value);
        
        
        // dispatch({type:'PLAYER_MODAL',payload:{playerUrl:'',playerModal:false}});
    }

    const videoControlsStyle = useAnimatedStyle(() => {
        return {
            opacity:isOptionsShown.value
        }
    })

    const filterAnimation = useAnimatedStyle(() => {

        return {
            opacity:isOptionsShown.value
        }
    })

    return (
        <>
        <StatusBar hidden />
        <View style={{backgroundColor:'black',flex:1,position:'relative'}}>
            <TapGestureHandler numberOfTaps={1} onActivated={activateHandle} >
                <Animated.View style={[Styles.videoContainer]}>
                    <Animated.View style={[Styles.videoFilter,filterAnimation]} />
                    <Animated.View style={[Styles.videoControls,videoControlsStyle]}>
                        <LinearGradient colors={['black','transparent']}>
                            <View style={Styles.headerContainer}>
                                <Pressable onPress={handleBack} style={Styles.cancelIcon}>
                                    <Image style={{width:'100%',height:'100%'}} source={require('../../assets/png/cross.png')} />
                                </Pressable>
                                <Pressable style={{width:24,height:24}}>
                                    <Image style={{width:'100%',height:'100%'}} source={require('../../assets/png/padlock.png')} />
                                </Pressable>
                            </View>
                        </LinearGradient>
                    </Animated.View>
                    <VideoPlayer 
                        controls={false}
                        fullscreen={true}
                        // filter
                        fullscreenAutorotate={true}
                        fullscreenOrientation='landscape'
                        // onFullscreenPlayerDidDismiss={exitFullScreen}
                        ref={videoRef}                    
                        // fullscreenOrientation='landscape'
                        // source={{uri:'http://192.168.0.103:3000/assets/videos/output.m3u8',
                        source={{uri:'http://192.168.0.104:3000/assets/videos/output.m3u8'}}
                            // source={{uri:'http://profficialsite.origin.mediaservices.windows.net/5ab94439-5804-4810-b220-1606ddcb8184/tears_of_steel_1080p-m3u8-aapl.ism/manifest(format=m3u8-aapl)',
                            // type:'m3u8'
                            // source={{uri:'https://res.cloudinary.com/anikets/video/upload/v1689084298/video4_yne8wm.mp4'
                        // }}
                        paused={false}
                    
                        onBuffer={(e) => console.log("Is Buffering",e)}
                        // repeat
                        resizeMode='contain'
                        onError={ErrorHandle}
                        style={Styles.video}
                    />
                </Animated.View>
            </TapGestureHandler>
                </View>
            </>
    )
}

const Styles = StyleSheet.create({
    videoContainer:{
        flex:1,
        backgroundColor:'black',
        width:metrics.screenHeight - (StatusBar.currentHeight / 2),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    video:{
        position:'relative',
        zIndex:0,
        ...Platform.select({
            ios:{
                width:'100%',
                height:'100%'
            },
            android:{
                width:'100%',
                height:'100%'
            }
        })
    },
    videoFilter:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor:'rgba(0,0,0,0.4)',
        zIndex:2,
    },
    videoControls:{
        ...StyleSheet.absoluteFillObject,
        zIndex:3,
    },  
    headerContainer:{
        position:'relative',
        height:80,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:14,
        paddingRight:14
    },
    cancelIcon:{
        width:20,
        height:20
    }
})