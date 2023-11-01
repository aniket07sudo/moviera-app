import { Alert, Button, Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedGestureHandler, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';
import VideoPlayer from 'react-native-video'
import metrics from '../../theme/metrics';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';

interface PreviewPlayerProps {
    isPreviewReady:Animated.SharedValue<number>
}

export default function PreviewPlayer({isPreviewReady}:PreviewPlayerProps) {

    const timerRef = useRef<any>();
    const [play,setPlay] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigation();

    const isFocussed = useIsFocused();

    // useEffect(() => {

    //     return () => {
    //         clearTimeout(timerRef.current);

    //     }
    // },[])

    const ErrorHandle = (e) => {
        // console.log("Handle",e);
    }


    const handleCompleteLoad = () => {
        // isPreviewReady.value = withDelay(3000,withTiming(1,{duration:400}));
        timerRef.current = setTimeout(() => {
            isPreviewReady.value = withTiming(1,{duration:400});
            setPlay(true);
        },3000);
    }

    return (
        <>
        <StatusBar hidden />
        <Pressable onPress={() => navigate.navigate('HomeStack',{screen:'VideoPlayer'})}>
            {/* <Animated.View style={Styles.videoContainer}>
                <VideoPlayer 
                    controls={false}
                    source={{uri:'http://192.168.0.103:3000/public/witch/index/master_eng.m3u8'}}
                    paused={!play || !isFocussed}
                    // onBuffer={(e) => console.log("Is Buffering",e)}
                    resizeMode='cover'
                    onError={ErrorHandle}
                    onLoad={handleCompleteLoad}
                    style={Styles.video}
                />
            </Animated.View> */}
        </Pressable>
        </>
    )
}

const Styles = StyleSheet.create({
    videoContainer:{
        position:'relative',
        // backgroundColor:'red'
    },
    video:{
        width:'100%',
        // height:'100%',
        aspectRatio: 10 / 9,
    }
})