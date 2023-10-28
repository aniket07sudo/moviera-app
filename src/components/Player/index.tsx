import { ActivityIndicator, ActivityIndicatorComponent, Alert, Button, Dimensions, Image, ImageBackground, Modal, Platform, Pressable, StatusBar, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView, PanGestureHandler, State, TapGestureHandler, TapGestureHandlerProperties ,  } from 'react-native-gesture-handler';
import Animated, { FadeIn, cancelAnimation, runOnJS, runOnUI, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import VideoPlayer, { OnBufferData, VideoProperties } from 'react-native-video'
import metrics from '../../theme/metrics';
import { MediumText, RegularText } from '../../utils/Text';
import { LegacyRef, RefObject, memo, useCallback, useEffect, useRef, useState } from 'react';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
// import { secToMinSec } from '../../utils/conversions';
import fonts from '../../theme/fonts';
import { ICaption, parseVtt } from '../../utils/parseVtt';
import VideoSlider from './slider';
import OverlayOptions from './OverlayOptions';
import { CustomOverlayOptionsType, CustomVideoProperties } from '../../ts/types/video';
import SliderBeta from './sliderBeta';
import React from 'react';
import { BlurView } from '@react-native-community/blur';
import BackIcon from '../../assets/icons/shared/back';


 function Player() {

    console.log("---------------------[Player Rerender]---------------------");    

    // const modalVisible = useSelector((state:IAppState) => state.ui.playerModal);
    const isOptionsShown = useSharedValue(1);
    const [isError,setIsError] = useState(false);
    // const [isBuffering,setIsBuffering] = useState(false);
    const isBuffering = useSharedValue<boolean>(true);
    // const [currentProgress,setCurrentProgress] = useState(0);
    // const currentTime = useSharedValue(0);
    const sliderProgress = useSharedValue(0);
    const maxValue = useSharedValue(0);
    const videoPlay = useSharedValue(0);
    const [play,setPlay] = useState(true);
    // const [currentLanguage,setCurrentLanguage] = useState('eng');
    const navigation = useNavigation();
    const seekable = useSharedValue(0);
    const [activeSubtitle,setActiveSubtitle] = useState<ICaption[]>([]);
    const [currentCaption,setCurrentCaption] = useState('');
    const videoRef = useRef<CustomVideoProperties | null >(null);
    const isScrubbing = useSharedValue<boolean>(false);

    
    

    const OverlayOptionsRef = useRef<CustomOverlayOptionsType>(null);


    useEffect(() => {
        if(videoRef.current) {
            videoRef.current.presentFullscreenPlayer();
        }
        Orientation.lockToLandscapeLeft();

        // console.log("Initial Orientation",Orientation.getInitialOrientation());
        if(Orientation.getInitialOrientation() == 'PORTRAIT') {
            Orientation.lockToLandscapeLeft();
            // console.log("After Orientation",Orientation.getInitialOrientation());
        }
       
        return () => {

            Orientation.lockToPortrait();
            Orientation.removeAllListeners();
            console.log("Unmount Video");
        }
    },[])

    

    const updateSliderValue = (data) => {
        'worklet'
        console.log("Update Slider Value",data);
        // let validSliderProgressValue = sliderProgress.value - 10 < 0 ? 0 : sliderProgress.value;
        sliderProgress.value = data;
        // setPlay(true);
    }

    const slideStart = () => {
        console.log("Pause");
        // runOnJS(setPlay)(false);
        isOptionsShown.value = withTiming(1);
        setPlay(false);
        // setPlay(false);
    }

    const handleBack = useCallback(() => {
        navigation.goBack();
    },[])


    const _onSlideComplete = useCallback((data:number) => {

        if(videoRef.current) {
            videoRef.current.seek(data,5);
        }
        sliderProgress.value = data;
          
        setPlay(true); //////  Performance BottleNeck
    },[])


    const _onLoad = ({duration}:{duration:number}) => {
        console.log("duration",duration);
        isBuffering.value = false;
        maxValue.value = duration;
        videoPlay.value = 1;
        
    }

    const activateHandle = () => {
        
        // isOptionsShown.value = withSequence(withTiming(1,{duration:200}),withDelay(3000,withTiming(0,{duration:200})));

        if(isOptionsShown.value) {
            isOptionsShown.value = withTiming(0);
        } else {
            isOptionsShown.value = withSequence(withTiming(1,{duration:200}),withDelay(3000,withTiming(0,{duration:200})));
        }
    }

    const handleStartShouldSetResponderCapture = (event) => {
        return true;
      };

    const handleTenSec = (type:string) => {
        let validSliderProgressValue = sliderProgress.value - 10 < 0 ? 0 : sliderProgress.value;
        if(type == 'backward') {
            sliderProgress.value = withTiming(validSliderProgressValue - 10);
            OverlayOptionsRef.current?.backward();
            videoRef.current?.seek(validSliderProgressValue - 10);
        } 
        if(type == 'forward') {
            sliderProgress.value = withTiming(sliderProgress.value + 10);
            OverlayOptionsRef.current?.forward();
            videoRef.current?.seek(sliderProgress.value + 10);
        }
        
    }

    const HandleBuffer = (e:OnBufferData) => {
        isBuffering.value = e.isBuffering;
    }

    const updateProgress = ({currentTime,playableDuration}) => {
        seekable.value = playableDuration;
        sliderProgress.value = currentTime;
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
    }

    const videoControlsStyle = useAnimatedStyle(() => {
        
        return {
            opacity:isOptionsShown.value,
        }
    })

    const ErrorHandle = (err:any) => {
        console.log("Error",err);
        setIsError(true);
        
    }

    const onLoadStart = () => {
        isBuffering.value = true;
        if(OverlayOptionsRef.current) {
            OverlayOptionsRef.current.play();
        }
    }

   


    if(isError) {
       
        return (
            <View style={{...StyleSheet.absoluteFillObject,backgroundColor:'rgba(0,0,0,0.1)',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',gap:20}}>
                    <Image resizeMode='contain' source={require('../../assets/images/warning.png')} />
                    <RegularText styles={{color:'#ff3333',fontSize:fonts.size.font18}}>Error Playing Video</RegularText>
                    <Pressable onPress={handleBack} style={Styles.backButton}>
                        <Image source={require('../../assets/images/back.png')} />
                    </Pressable>
                </View>
            </View>
        )
    }

    return (
        <>
            {/* <StatusBar hidden /> */}
            {/* <GestureHandlerRootView style={{flex:1,flexDirection:'row',alignItems:'center'}}> */}
            {/* <View style={{flex:1,backgroundColor:'blue',zIndex:50}}> */}
                <TapGestureHandler numberOfTaps={1} onActivated={activateHandle}  >
                {/* <GestureDetector gesture={Gesture.Exclusive(singleTap)}> */}
                
                    <Animated.View style={[Styles.videoContainer]}>
                    <Animated.View style={[videoControlsStyle,Styles.outsideControls]}>
                        <OverlayOptions isScrubbing={isScrubbing} ref={OverlayOptionsRef} isBuffering={isBuffering} handleTenSec={handleTenSec.bind(null)} togglePlay={togglePlay} handleBack={handleBack} />
                        <SliderBeta isScrubbing={isScrubbing} seekable={seekable} slideStart={slideStart} maxValue={maxValue} _onSlideComplete={_onSlideComplete} sliderProgress={sliderProgress} />
                    </Animated.View>
                        <VideoPlayer 
                            // collapsable={false}
                            controls={false}
                            onLoadStart={onLoadStart}
                            // preferredForwardBufferDuration={20}

                            // onExternalPlaybackChange={togglePlay}
                            onLoad={_onLoad}
                            // volume={100}
                            onProgress={updateProgress}
                            // useTextureView={true}
                            ref={videoRef}     
                            playWhenInactive={true}
                            playInBackground={true}  
                            source={{uri:`http://192.168.0.102:3000/public/witch/index/master_eng.m3u8` }}
                            paused={!play}
                            onBuffer={HandleBuffer}
                            resizeMode='contain'
                            onError={ErrorHandle}
                            style={[Styles.video]}
                        />
                    </Animated.View>
                </TapGestureHandler>
                {/* </GestureDetector> */}

                {/* <Animated.View style={[videoControlsStyle,Styles.outsideControls]}>
                    <OverlayOptions isScrubbing={isScrubbing} ref={OverlayOptionsRef} isBuffering={isBuffering} handleTenSec={handleTenSec.bind(null)} togglePlay={togglePlay} handleBack={handleBack} />
                    <SliderBeta isScrubbing={isScrubbing} seekable={seekable} slideStart={slideStart} maxValue={maxValue} _onSlideComplete={_onSlideComplete} sliderProgress={sliderProgress} />
                </Animated.View> */}
            {/* </View> */}
            {/* </GestureHandlerRootView> */}
        </>
    )
}

const Styles = StyleSheet.create({
    videoContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'green',
        position:'relative',
        zIndex:2
    },
    outsideControls:{
        // width:896,
        ...StyleSheet.absoluteFillObject,
        // position:'absolute',
        // top:0,
        // right:0,
        // bottom:0,
        // left:0,
        // backgroundColor:'red',
        zIndex:5
    },
    video:{
        aspectRatio:16 / 9,
        // width:metrics.screenHeight
        ...Platform.select({
            ios:{
                width:metrics.screenHeight,
            },
            android:{
                width:metrics.screenHeight,
                // flex:1
            }
        })
    },
    OverlayOptionContainer:{
        ...StyleSheet.absoluteFillObject,
        zIndex:10,
        // backgroundColor:'green',
    },
    sliderTime:{
        maxWidth:100,
        textAlign:'center',
    },
    bottomContainer:{
        position:'absolute',
        bottom:0,
        right:0,
        left:0,
        flexDirection:'column',
    },
    bottomSlider:{
        flexDirection:'row',
        alignItems:'center',
        gap:6,
        paddingRight:10,
        paddingLeft:10
    },
    slider:{
        bottom:0,
        borderRadius:30,
        width:metrics.screenWidth - 200,
    },
    backButton:{
        // width:50,
        // height:50,
        
    }
})

export default memo(Player);