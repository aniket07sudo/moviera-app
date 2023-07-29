import { Alert, Button, Image, Modal, Platform, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import { PanGestureHandler, TapGestureHandler ,  } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import VideoPlayer from 'react-native-video'
import metrics from '../../theme/metrics';
import { MediumText } from '../../utils/Text';
import { useEffect, useRef, useState } from 'react';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../ts/interfaces';
import { Colors } from '../../theme/colors';

export default function Player() {

    const [fullScreen,setFullScreen] = useState(false);

    const modalVisible = useSelector((state:IAppState) => state.ui.playerModal);
    const dispatch = useDispatch();
    const videoRef = useRef();

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

    const exitFullScreen = () => {
        console.log("Exit Full Screen");
        // Orientation.lockToPortrait();
        videoRef.current.dismissFullscreenPlayer();
        navigation.goBack();

        
        // dispatch({type:'PLAYER_MODAL',payload:{playerUrl:'',playerModal:false}});
    }

    return (
        <>
        {/* <StatusBar barStyle={'light-content'} /> */}
        {/* <StatusBar backgroundColor={'red'} /> */}
        <View style={{backgroundColor:'black',flex:1}}>
            {/* <TapGestureHandler > */}
                <Animated.View style={Styles.videoContainer}>
                    <Pressable style={{...StyleSheet.absoluteFillObject,zIndex:1}} onPress={exitFullScreen}>
                        <View>
                            <Text>Closse</Text>
                        </View>
                    </Pressable>
                    <VideoPlayer 
                        controls={false}
                        fullscreen={true}
                        fullscreenAutorotate={true}
                        fullscreenOrientation='landscape'
                        // onFullscreenPlayerDidDismiss={exitFullScreen}
                        ref={videoRef}                    
                        // fullscreenOrientation='landscape'
                        // source={{uri:'http://192.168.0.103:3000/assets/videos/output.m3u8',
                        source={{uri:'http://192.168.0.100:3000/assets/videos/output.m3u8'}}
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
                </View>
            {/* </TapGestureHandler> */}
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
    }
})