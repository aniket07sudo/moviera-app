import { ActivityIndicator, ActivityIndicatorComponent, Alert, Button, Image, Modal, Platform, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import { PanGestureHandler, TapGestureHandler ,  } from 'react-native-gesture-handler';
import Animated, { FadeIn, cancelAnimation, runOnJS, runOnUI, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import VideoPlayer, { VideoProperties } from 'react-native-video'
import metrics from '../../theme/metrics';
import { MediumText, RegularText } from '../../utils/Text';
import { LegacyRef, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../ts/interfaces';
import { Colors } from '../../theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import {Slider} from 'react-native-awesome-slider'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { secToMinSec } from '../../utils/conversions';
import fonts from '../../theme/fonts';
import BackIcon from '../../assets/icons/shared/back';
import axios from 'axios';
import { ICaption, parseVtt } from '../../utils/parseVtt';
import { CustomVideoProperties } from '../../ts/types/video';
import VideoSlider from './slider';
import BottomOptions from './bottomOptions';
import OverlayOptions from './OverlayOptions';
import LottieView, { LottieViewProps } from 'lottie-react-native';





export default function Player() {

    console.log("---------------------[Player Rerender]---------------------");    

    // const modalVisible = useSelector((state:IAppState) => state.ui.playerModal);
    const isOptionsShown = useSharedValue(0);
    // const [isBuffering,setIsBuffering] = useState(false);
    const isBuffering = useSharedValue(0);
    // const [currentProgress,setCurrentProgress] = useState(0);
    const currentTime = useSharedValue(0);
    const sliderProgress = useSharedValue(0);
    const minValue = useSharedValue(0);
    const maxValue = useSharedValue(0);
    const videoPlay = useSharedValue(0);
    const [play,setPlay] = useState(true);
    // const [currentLanguage,setCurrentLanguage] = useState('eng');
    const navigation = useNavigation();
    const cacheValue = useSharedValue(0);
    const [activeSubtitle,setActiveSubtitle] = useState<ICaption[]>([]);
    const [currentCaption,setCurrentCaption] = useState('');
    const videoRef = useRef(null);

    const OverlayOptionsRef = useRef(null);

    const Padding = useSafeAreaInsets();



    useEffect(() => {
        if(videoRef.current) {
            videoRef.current.presentFullscreenPlayer();
        }
        Orientation.lockToLandscapeLeft();
        console.log("Initial Orientation",Orientation.getInitialOrientation());
        if(Orientation.getInitialOrientation() == 'PORTRAIT') {
            Orientation.lockToLandscapeLeft();
            // console.log("After Orientation",Orientation.getInitialOrientation());
        }
       
        return () => {
            Orientation.lockToPortrait();
        }
    },[])


    // const updateSubtitle = (time:number) => {

    //     console.log("Subtitle",time,activeSubtitle);
    //     const caption = activeSubtitle.find(sub => sub.start <= time && sub.end >= time);
    //     console.log("Caption",caption?.content);
        
    //     setCurrentCaption(caption?.content);
        
    // }

    // const ErrorHandle = (e) => {
    //     console.log("Handle",e);
    // }

    const handleBack = useCallback(() => {
        navigation.goBack();
    },[])

    const onSlideComplete = (data) => {
        'worklet'
         
        sliderProgress.value = data;

        console.log("Slide Complete",data);
        // isOptionsShown.value = withSequence(withTiming(1,{duration:400}),withDelay(2000,withTiming(0,{duration:400})));        
        // isOptionsShown.value = withTiming(1);        
        // sliderProgress.value = data;
    }

    const _onSlideComplete = useCallback((data) => {
        sliderProgress.value = data;
        // runOnUI(onSlideComplete)(data);
        if(videoRef.current) {
            videoRef.current.seek(data);
            // setPlay(!play);

        }
        setPlay(true);
    },[])

    const onSlideStart = () => {    
        'worklet'
        isOptionsShown.value = 1;
        
    }

    const _onSlideStart = useCallback(() => {
        console.log("Slide start");
        runOnUI(onSlideStart);
        setPlay(false);
    },[])

    const onValueChange = useCallback((data) => {
        console.log("Scrub",data);
        sliderProgress.value = data;
        
    },[])

    const _onLoad = (data) => {
        console.log("Data",data);
        maxValue.value = data.duration;
        videoPlay.value = 1;
        
    }

    const activateHandle = () => {
        console.log("Shared Value Before",isOptionsShown.value);
        
        isOptionsShown.value = withSequence(withTiming(1,{duration:400}),withDelay(2000,withTiming(0,{duration:400})));
        console.log("Shared Value After",isOptionsShown.value);
        
        
        // dispatch({type:'PLAYER_MODAL',payload:{playerUrl:'',playerModal:false}});
    }

    function handleProgress(progressData) {
        'worklet';
        // currentTime
        sliderProgress.value = progressData.currentTime;
        cacheValue.value = progressData.playableDuration;
        // updateSubtitle(progressData.currentTime);
        
    }

    const handleTenSec = (type:string) => {
        console.log("Type",type);
        if(type == 'backward') {
            videoRef.current.seek(sliderProgress.value - 10);
        } 
        if(type == 'forward') {
            videoRef.current.seek(sliderProgress.value + 10);
        }
        
    }

    const HandleBuffer = (e) => {
        isBuffering.value = e.isBuffering;
    }

    const updateProgress = (progressData) => {
        sliderProgress.value = progressData.currentTime;
        cacheValue.value = progressData.playableDuration;
        // runOnUI(handleProgress)(progressData);
    }


    const handlePlay = (videoPlay) => {
        'worklet'
        console.log("Handle Play UI",videoPlay.value);
        // setPlay(!play);
        // videoPlay.value = withTiming(0);
        // if (videoPlay.value === 0) {
        //     videoPlay.value = withDelay(1000,withTiming(1,{duration:100})); // Or whatever number you intend to assign
        //   } else {
        //     videoPlay.value = withDelay(100,withTiming(0,{duration:1000})); // Toggle to the other number
        //   }

        // runOnJS(handleOnJS)(videoPlay.value)

       
    }

    const updatePlay = (videoPlay) => {
        console.log("Handle Play");
        
        runOnUI(handlePlay)(videoPlay);
    }
    
    const togglePlay = () => {
        setPlay(!play);
        if(OverlayOptionsRef.current) {
            if(play) {
                OverlayOptionsRef.current.pause();
            } else {
                OverlayOptionsRef.current.play();
            }
        }
        runOnUI(handlePlay)(videoPlay);
    }

    const videoControlsStyle = useAnimatedStyle(() => {
        return {
            opacity:isOptionsShown.value
        }
    })

    const onLoadStart = () => {
        isBuffering.value = 0;
        if(OverlayOptionsRef.current) {
            OverlayOptionsRef.current.play();

        }
    }
    

    return (
        <>
            <StatusBar hidden />
            <View style={{flex:1,position:'relative',backgroundColor:Colors.black}}>
                <TapGestureHandler numberOfTaps={1} onActivated={activateHandle} >
                    <Animated.View style={[Styles.videoContainer]}>
                        <Animated.View style={[Styles.OverlayOptionContainer,videoControlsStyle]}>
                            {/* <OverlayOptions togglePlay={togglePlay} videoPlay={videoPlay} handleTenSec={handleTenSec.bind(null)} handleBack={handleBack} /> */}
                            <OverlayOptions ref={OverlayOptionsRef} isBuffering={isBuffering} handleTenSec={handleTenSec.bind(null)} togglePlay={togglePlay} handleBack={handleBack} />
                            <VideoSlider onValueChange={onValueChange} _onSlideStart={_onSlideStart} onSlideComplete={_onSlideComplete} sliderProgress={sliderProgress} minValue={minValue} maxValue={maxValue} cacheValue={cacheValue} />
                        </Animated.View>
                        <VideoPlayer 
                            // collapsable={false}
                            controls={false}
                            onLoadStart={onLoadStart}
                            // onExternalPlaybackChange={togglePlay}
                            onLoad={_onLoad}
                            
                            // volume={100}
                            onProgress={updateProgress}
                            // useTextureView={true}
                            ref={videoRef}       
                            playWhenInactive={true}
                            playInBackground={true}  
                            source={{uri:`http://192.168.0.104:3000/public/witch/index/master_eng.m3u8`  }}
                            paused={!play}
                            onBuffer={HandleBuffer}
                            resizeMode='contain'
                            // onError={ErrorHandle}
                
                            style={[Styles.video,{left:Padding.top}]}
                        />
                        <View style={Styles.subtitles}>
                            <MediumText styles={{textAlign:'center',fontSize:fonts.size.font18}}>{currentCaption}</MediumText>
                        </View>
                    </Animated.View>
                </TapGestureHandler>
            </View>
        </>
    )
}

const Styles = StyleSheet.create({
    videoContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    
    video:{
        position:'absolute',
        zIndex:1,
        aspectRatio:16 / 9,
        ...Platform.select({
            ios:{
                width:metrics.screenHeight,
            },
            android:{
                width:metrics.screenHeight,
                // flex:1,
                // height:metrics.screenWidth,
            }
        })
    },
    OverlayOptionContainer:{
        ...StyleSheet.absoluteFillObject,
        zIndex:3,
        // backgroundColor:'red'
    },
    subtitles:{
        position:'absolute',
        zIndex:2,
        bottom:40,
        right:0,
        left:0
    },
    sliderTime:{
        maxWidth:100,
        textAlign:'center',
    },
    // centerOptions:{
    //     flexDirection:'row',
    //     justifyContent:'space-evenly',
    //     position:'absolute',
    //     height:50,
    //     right:0,
    //     left:0,
    //     top:(metrics.screenWidth / 2) - 25,
    //     bottom:-100,
    // },
    bottomContainer:{
        position:'absolute',
        bottom:0,
        right:0,
        left:0,
        flexDirection:'column',
    },
    // bottomOptions:{
    //     flexDirection:'row',
    //     justifyContent:'space-evenly',
    //     alignItems:'center',
    //     flex:1
    // },
    // bottomIconContainer:{
    //     flexDirection:'column',
    //     alignItems:'center',
    //     gap:4,
    //     maxHeight:80,
    // },
    bottomSlider:{
        flexDirection:'row',
        alignItems:'center',
        gap:6,
        paddingRight:10,
        paddingLeft:10
        // paddingRight:StatusBar.currentHeight
    },
    // videoFilter:{
    //     ...StyleSheet.absoluteFillObject,
    //     backgroundColor:'rgba(0,0,0,0.4)',
    //     zIndex:2,
    // },
    // videoControls:{
    //     ...StyleSheet.absoluteFillObject,
    //     zIndex:5,
    //     width:metrics.screenHeight,
    // },  
    // headerContainer:{
    //     position:'absolute',
    //     top:0,
    //     left:0,
    //     right:0,
    //     height:80,
    //     flexDirection:'row',
    //     alignItems:'center',
    //     justifyContent:'space-between',
    //     paddingLeft:30,
    //     paddingRight:30,
    // },
    // cancelIcon:{
    //     width:20,
    //     height:20
    // },
    slider:{
        // ...StyleSheet.absoluteFillObject,
        bottom:0,
        borderRadius:30,
        width:metrics.screenWidth - 200,
        // overflow:'hidden'
    },
    // screenOptions:{
    //     width:44,
    //     height:44,
    //     overflow:'hidden',
    //     flexDirection:'row',
    //     justifyContent:'center',
    //     alignItems:'center'
    // }
})