import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import Animated, { Easing, FadeIn, interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import MaskedView from "@react-native-masked-view/masked-view";
import { Rect, Svg } from "react-native-svg";
import LinearGradient from "react-native-linear-gradient";
import { DataProps } from "../../screens/main/Home/HeroData";
import { MediumText, RegularText, SemiBold } from "../../utils/Text";
import fonts from "../../theme/fonts";
import { Colors } from "../../theme/colors";
import Video, { VideoProperties } from "react-native-video";
// import { Image } from "react-native-svg";

const ITEM_HEIGHT = Dimensions.get('screen').height * 0.68;
const ITEM_WIDTH = Dimensions.get('screen').width;

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface ItemProps {
    item:DataProps,
    index:number,
    pause:boolean,
    ScrollX:Animated.SharedValue<number>
}

const AnimatedVideo = Animated.createAnimatedComponent(Video);

const CarouselItem = forwardRef(({item,index,pause,ScrollX}:ItemProps,ref) => {

    const inputRange = [(index - 1) * ITEM_WIDTH,index * ITEM_WIDTH,(index + 1) * ITEM_WIDTH];
    const [showVideo,setShowVideo] = useState(false);
    const [paused,setPaused] = useState(pause);

    const timerRef = useRef<any>(null);

    const opacityValue = useSharedValue(0);

    useImperativeHandle(ref,() => ({
        startRender:() => {
            initalRender();
        },
        removeRender:() => {
            clearTimeout(timerRef.current);
            setPaused(true);
            // setShowVideo(false);
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
            width:ITEM_WIDTH,
            height:ITEM_HEIGHT,
            position:'absolute',
            opacity:opacityValue.value,
            transform:[{
                translateX:interpolate(ScrollX.value,inputRange,[-ITEM_WIDTH * 0.5,0,ITEM_WIDTH * 0.5])
            }]
        }
    })

    const animatedImageStyle = useAnimatedStyle(() => {
        return {
            width:ITEM_WIDTH,
            height:ITEM_HEIGHT,
            position:'absolute',
            transform:[{
                translateX:interpolate(ScrollX.value,inputRange,[-ITEM_WIDTH * 0.5,0,ITEM_WIDTH * 0.5])
            }]
        }
    })

    const textAnimationStyle = useAnimatedStyle(() => {
        return {
            transform:[{
                translateX:interpolate(ScrollX.value,inputRange,[ITEM_WIDTH * .8,0,-ITEM_WIDTH * .8])
            }]
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
            },3000)
        }
        
    }

    const ImageLoaded = () => {
        console.log("Image Ready");
        setPaused(true);
        setTimeout(() => {
            // setShowVideo(true);
            // zIndexValue.value = withTiming(4,{duration:3000});
            opacityValue.value = withTiming(1,{duration:500})
            setPaused(false);
        },2000)
    }

    return (
        <View  style={{flex:1,height:ITEM_HEIGHT,width:ITEM_WIDTH}}>
            <View style={Styles.container}>
            
                <AnimatedImage style={[animatedImageStyle]} source={item.value.image} />
               {/* {showVideo && <AnimatedVideo 
                        style={[animatedVideoStyle]}
                        // onReadyForDisplay={ImageLoaded}
                        paused={paused}
                        
                        poster={'../../../assets/images/Hero.jpeg'}
                        repeat
                        resizeMode={'cover'}
                        source={{uri:item.value.video}}
                    /> } */}

                    <AnimatedVideo 
                        style={[animatedVideoStyle]}
                        // onReadyForDisplay={ImageLoaded}
                        paused={paused}
                        
                        poster={'../../../assets/images/Hero.jpeg'}
                        repeat
                        resizeMode={'cover'}
                        source={{uri:item.value.video}}
                    />
                        
                    <LinearGradient start={{x:0.3,y:0.1}} end={{x:0.3,y:0.98}} style={Styles.linearGradient} colors={['transparent',Colors.secondary]}>
                        <Animated.View style={[Styles.textContainer,textAnimationStyle]}>
                            <SemiBold styles={{fontSize:fonts.size.font24}}>Dr Strange</SemiBold>
                            <MediumText styles={Styles.category}>Action</MediumText>
                            <RegularText styles={{fontSize:fonts.size.font12,textAlign:'center'}} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima laborum natus, saepe esse necessitatibus quisquam quaerat commodi itaque animi ipsa.</RegularText>
                        </Animated.View>
                    </LinearGradient>
                {/* </AnimatedImage> */}
                
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