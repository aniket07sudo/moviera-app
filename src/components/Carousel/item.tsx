import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Dimensions, Image, Pressable, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import Animated, { Easing, Extrapolation, FadeIn, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import { DataProps } from "../../screens/main/Home/HeroData";
import { MediumText, RegularText, SemiBold } from "../../utils/Text";
import fonts from "../../theme/fonts";
import { Colors } from "../../theme/colors";
import Video from "react-native-video";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SoundIcon from "../../assets/icons/Carousel/Sound";
import { useIsFocused } from "@react-navigation/native";
// import { Image } from "react-native-svg";

const ITEM_HEIGHT = Dimensions.get('screen').height * 0.68;
const ITEM_WIDTH = Dimensions.get('screen').width;

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface ItemProps {
    item:DataProps,
    index:number,
    pause:boolean,
    isSound:boolean,
    setIsSound:any,
    ScrollX:Animated.SharedValue<number>,
}

const AnimatedVideo = Animated.createAnimatedComponent(Video);

const CarouselItem = forwardRef(({item,index,pause,ScrollX,isSound,setIsSound}:ItemProps,ref) => {

    const inputRange = [(index - 1) * ITEM_WIDTH,index * ITEM_WIDTH,(index + 1) * ITEM_WIDTH];
    const [showVideo,setShowVideo] = useState(false);
    const [paused,setPaused] = useState(pause);
    const soundOpacity = useSharedValue(0);

    const timerRef = useRef<any>(null);

    const opacityValue = useSharedValue(0);

    useImperativeHandle(ref,() => ({
        startRender:() => {
            initalRender();
        },
        removeRender:() => {
            setPaused(true);
            clearTimeout(timerRef.current);
        },
        play:() => {
            setPaused(false);
        },
        pause:() => {
            setPaused(true);
        }
    }));


    const animatedVideoStyle = useAnimatedStyle(() => {
        return {
            opacity:opacityValue.value,
            transform:[{
                translateX:interpolate(ScrollX.value,inputRange,[-ITEM_WIDTH * 0.7,0,ITEM_WIDTH * 0.7])
            }]
        }
    })

    const animatedImageStyle = useAnimatedStyle(() => {
        return {
            
            transform:[{
                translateX:interpolate(ScrollX.value,inputRange,[-ITEM_WIDTH * 0.7,0,ITEM_WIDTH * 0.7])
            }]
        }
    })

    const textAnimationStyle = useAnimatedStyle(() => {
        return {
            transform:[{
                translateX:interpolate(ScrollX.value,inputRange,[ITEM_WIDTH * .7,0,-ITEM_WIDTH * .7]),
            }]
        }
    })
    

    const showSoundIconStyle = useAnimatedStyle(() => {
        return {
            opacity:soundOpacity.value
        }
    })

    const initalRender = () => {
        if(showVideo) {
            setPaused(false);

        } else {
            
            timerRef.current = setTimeout(() => {
                opacityValue.value = withTiming(1,{duration:500});
                setPaused(false);
                setShowVideo(true);
                soundOpacity.value = withTiming(1,{duration:500,easing:Easing.ease});
            },3000)

        }
        
    }

    const VideoLoaded = () => {
        
    }

    const handleSoundClick = () => {
        console.log("Soound Click");
        
        setIsSound(!isSound);
    }

    const Padding = useSafeAreaInsets();

    const screenIsFocused = useIsFocused();

    // 

    return (
        <View  style={{flex:1,height:ITEM_HEIGHT,width:ITEM_WIDTH}}>
            <View style={Styles.container}>
                    <Animated.View style={[Styles.soundContainer,{top:Padding.top + 10},showSoundIconStyle]}  >
                        <Pressable style={Styles.soundPressable} onPress={handleSoundClick} >
                            <SoundIcon isSound={isSound} />
                        </Pressable>
                    </Animated.View>
                <AnimatedImage style={[animatedImageStyle,{width:ITEM_WIDTH,height:ITEM_HEIGHT,position:'absolute'}]} source={item.image} />

                    <AnimatedVideo 
                        style={[animatedVideoStyle,{width:ITEM_WIDTH,height:ITEM_HEIGHT,position:'absolute'}]}
                        onReadyForDisplay={VideoLoaded}
                        muted={!isSound}
                        paused={paused || !screenIsFocused}
                        ignoreSilentSwitch={'ignore'}
                        poster={'../../../assets/images/Hero.jpeg'}
                        repeat
                        playWhenInactive
                        resizeMode={'cover'}
                        source={{uri:item.video}}
                    />
                        
                    <LinearGradient start={{x:0.3,y:0.1}} end={{x:0.3,y:0.98}} style={Styles.linearGradient} colors={['transparent',Colors.secondary]}>
                        <Animated.View style={[Styles.textContainer,textAnimationStyle]}>
                            <SemiBold styles={{fontSize:fonts.size.font24}}>Dr Strange</SemiBold>
                            <MediumText styles={Styles.category}>Action</MediumText>
                            <RegularText styles={{fontSize:fonts.size.font12,textAlign:'center'}} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima laborum natus, saepe esse necessitatibus quisquam quaerat commodi itaque animi ipsa.</RegularText>
                        </Animated.View>
                    </LinearGradient>
                
            </View>
        </View>
    )
});

const Styles = StyleSheet.create({
    container:{
        width:ITEM_WIDTH,
        height:ITEM_HEIGHT,
        overflow:'hidden',
        position:'relative'
    },
    soundContainer:{
        position:'absolute',
        right:20,
        zIndex:5,
    },
    soundPressable:{
        // backgroundColor:'red',
        padding:10
    },
    videoContainer:{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        width:ITEM_WIDTH,
        height:ITEM_HEIGHT,
        overflow:'hidden'
    },
    category:{
        fontSize:fonts.size.font12,
        color:Colors.textGrey
    },
    imageContainer:{
        width:ITEM_WIDTH,
        height:ITEM_HEIGHT,
        resizeMode:'cover',
    },
    textContainer:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        gap:2,
        position:'absolute',
        bottom:50,
        left:10,
        right:10
    },
    linearGradient:{
        ...StyleSheet.absoluteFillObject,
        zIndex:4
    }
})

export default CarouselItem;