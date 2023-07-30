import { Alert, Button, Image, Modal, Platform, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import { PanGestureHandler, TapGestureHandler ,  } from 'react-native-gesture-handler';
import Animated, { cancelAnimation, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import VideoPlayer, { TextTrackType } from 'react-native-video'
import metrics from '../../theme/metrics';
import { MediumText } from '../../utils/Text';
import { useEffect, useRef, useState } from 'react';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../ts/interfaces';
import { Colors } from '../../theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import {Slider} from 'react-native-awesome-slider'
import { SafeAreaView } from 'react-native-safe-area-context';
import { secToMinSec } from '../../utils/conversions';

const HEADER_HEIGHT = 80;
const CENTER_HEIGHT = 50;
const BOTTOM_HEIGHT = 100;

export default function Player() {

    const modalVisible = useSelector((state:IAppState) => state.ui.playerModal);
    // const dispatch = useDispatch();
    const videoRef = useRef();
    const isOptionsShown = useSharedValue(0);
    const [currentProgress,setCurrentProgress] = useState(0);
    const sliderProgress = useSharedValue(0);
    const minValue = useSharedValue(0);
    const maxValue = useSharedValue(0);
    const [play,setPlay] = useState(true);
    const navigation = useNavigation();

    const cacheValue = useSharedValue(0);
    // const [currentTime,setCurrentTime] = useState();

    console.log("Modal Visible",modalVisible);
    

    useEffect(() => {
        if(videoRef.current) {

            videoRef.current.presentFullscreenPlayer();
        }
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

    const onSlideComplete = (data) => {
        console.log("New Value",data);
        if(videoRef.current) {
            videoRef.current.seek(data,50);
        }
        sliderProgress.value = data;
        setPlay(true);
        // setCurrentProgress(data);

        // console.log("Seek Time",data.seekTime);
        
    }

    const _onSlideStart = () => {
        setPlay(false);
    }

    const _onLoad = (data) => {
        maxValue.value = data.duration;
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

    const handlePlay = () => {
        console.log("Handle Play");
        setPlay(!play);
    }

    const handlePrevious = () => {
        console.log("Handle Previous");
    }

    const handleProgress = (progressData) => {
        console.log("Progress Data",progressData);
        // sliderProgress.value = ( progressData.currentTime / progressData.seekableDuration ) * 100;
        sliderProgress.value = progressData.currentTime;
        setCurrentProgress(progressData.currentTime);
        cacheValue.value = progressData.playableDuration;
    }

    return (
        <>
        <StatusBar hidden />
        <View style={{backgroundColor:'black',flex:1,position:'relative'}}>
            <TapGestureHandler numberOfTaps={1} onActivated={activateHandle} >
                <Animated.View style={[Styles.videoContainer]}>
                    <Animated.View style={[Styles.videoFilter,filterAnimation]} />
                    <Animated.View style={[Styles.videoControls,videoControlsStyle]}>
                        <LinearGradient style={{...StyleSheet.absoluteFillObject,height:HEADER_HEIGHT}} colors={['rgba(0,0,0,0.5)','transparent']}>
                            <View style={Styles.headerContainer}>
                                <Pressable onPress={handleBack} style={Styles.cancelIcon}>
                                    <Image style={{width:20,height:20}} source={require('../../assets/png/cross.png')} />
                                </Pressable>
                                <Pressable style={{width:24,height:24}}>
                                    <Image style={{width:24,height:24}} source={require('../../assets/png/padlock.png')} />
                                </Pressable>
                            </View>
                        </LinearGradient>
                        <View style={Styles.centerOptions}>
                            <Pressable onPress={handlePrevious} style={Styles.screenOptions}>
                                <Image style={{width:44,height:44}} source={require('../../assets/png/back.png')} />
                            </Pressable>
                            <Pressable onPress={handlePlay} style={Styles.screenOptions}>
                                <Image style={{width:44,height:44}} source={require('../../assets/png/video_play.png')} />
                            </Pressable>
                            <Pressable style={Styles.screenOptions}>
                                <Image style={{width:44,height:44}} resizeMode='contain'  source={require('../../assets/png/next.png')} />
                            </Pressable>
                        </View>
                            <View style={Styles.bottomOptions}>
                            <LinearGradient style={{...StyleSheet.absoluteFillObject,height:BOTTOM_HEIGHT}} colors={['transparent','rgba(0,0,0,0.5)']}>
                                {/* <Text>{secToMinSec(currentProgress)}</Text> */}
                                <Slider
                                    style={Styles.slider} 
                                    progress={sliderProgress}
                                    minimumValue={minValue}
                                    maximumValue={maxValue}
                                    sliderHeight={7}
                                    // onValueChange={onSliderChange}
                                    // cache={cacheValue}
                                    onSlidingComplete={onSlideComplete}
                                    onSlidingStart={_onSlideStart}
                                    theme={{
                                        cacheTrackTintColor:'green',
                                        minimumTrackTintColor:Colors.primary,
                                        maximumTrackTintColor:Colors.grey
                                    }}
                                />
                                {/* <Text>{secToMinSec(maxValue.value)}</Text> */}
                            </LinearGradient>
                        </View>
                    </Animated.View>
                    <VideoPlayer 
                        controls={false}
                        fullscreen={true}
                        fullscreenAutorotate={true}
                        fullscreenOrientation='landscape'
                        onLoad={_onLoad}
                        
                        textTracks={[
                            {
                                title:'English',
                                language:'en',
                                type:TextTrackType.VTT,
                                uri:'http://192.168.0.104:3000/subtitle_en.vtt'
                            }
                        ]}
                        selectedTextTrack={{
                            type:'language',
                            value:'en'
                        }}
                        
                        // selectedVideoTrack={{
                        //     type:'resolution',
                        //     value:1080
                        // }}
                        // onFullscreenPlayerDidDismiss={exitFullScreen}
                        onProgress={handleProgress}
                        ref={videoRef}                    
                        // fullscreenOrientation='landscape'
                        // source={{uri:'http://192.168.0.103:3000/assets/videos/output.m3u8',
                        source={{uri:'http://192.168.0.104:3000/outputs/output_480p.m3u8',type:'m3u8'}}
                            // source={{uri:'http://profficialsite.origin.mediaservices.windows.net/5ab94439-5804-4810-b220-1606ddcb8184/tears_of_steel_1080p-m3u8-aapl.ism/manifest(format=m3u8-aapl)',
                            // type:'m3u8'
                            // source={{uri:'https://res.cloudinary.com/anikets/video/upload/v1689084298/video4_yne8wm.mp4'
                        // }}cd
                        paused={!play}
                    
                        onBuffer={(e) => console.log("Is Buffering",e)}
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
        // width:metrics.screenHeight - (StatusBar.currentHeight / 2),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    video:{
        position:'relative',
        zIndex:0,
        aspectRatio:16 / 9,
        ...Platform.select({
            ios:{
                width:metrics.screenHeight,
                // height:'100%',
            },
            android:{
                width:metrics.screenHeight,
                // height:'100%',

            }
        })
    },
    centerOptions:{
        flexDirection:'row',
        justifyContent:'space-around',
        position:'absolute',
        height:50,
        right:0,
        left:0,
        top:(metrics.screenWidth / 2) - 25,
        bottom:-100,
    },
    bottomOptions:{
        position:'absolute',
        height:90,
        // backgroundColor:'red',
        bottom:0,
        right:0,
        left:0,
    },
    videoFilter:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor:'rgba(0,0,0,0.4)',
        zIndex:2,
    },
    videoControls:{
        ...StyleSheet.absoluteFillObject,
        zIndex:5,
    },  
    headerContainer:{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        height:80,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingLeft:14,
        paddingRight:14,
    },
    cancelIcon:{
        width:20,
        height:20
    },
    slider:{
        ...StyleSheet.absoluteFillObject,
        bottom:0,
        height:80
        // width:200
    },
    screenOptions:{
        width:44,
        height:44
    }
})