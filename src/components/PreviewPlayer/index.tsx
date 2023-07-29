import { Alert, Button, Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedGestureHandler, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';
import VideoPlayer from 'react-native-video'
import metrics from '../../theme/metrics';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

interface PreviewPlayerProps {
    isPreviewReady:Animated.SharedValue<number>
}

export default function PreviewPlayer({isPreviewReady}:PreviewPlayerProps) {

    const timerRef = useRef<any>();
    const [play,setPlay] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {

        return () => {
            clearTimeout(timerRef.current);

        }
    },[])

    const ErrorHandle = (e) => {
        console.log("Handle",e);
    }


    const handleCompleteLoad = () => {
        // isPreviewReady.value = withDelay(3000,withTiming(1,{duration:400}));
        timerRef.current = setTimeout(() => {
            isPreviewReady.value = withTiming(1,{duration:400});
            setPlay(true);
        },3000);
    }

    return (
        // <Pressable onPress={goToPlayer}>
            <Animated.View style={Styles.videoContainer}>
                <VideoPlayer 
                    controls={false}
                    source={{uri:'http://192.168.0.104:3000/assets/videos/output.m3u8'}}
                    paused={!play}
                    onBuffer={(e) => console.log("Is Buffering",e)}
                    resizeMode='contain'
                    onError={ErrorHandle}
                    onLoad={handleCompleteLoad}
                    style={Styles.video}
                />
            </Animated.View>
        // </Pressable>
    )
}

const Styles = StyleSheet.create({
    videoContainer:{
        position:'relative',
    },
    video:{
        width:undefined,
        height:'100%',
        aspectRatio:16 / 9,
    }
})