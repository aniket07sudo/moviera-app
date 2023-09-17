import { Image, ImageProps, StyleSheet, View } from "react-native";
import { RegularText } from "../../utils/Text";
import { Bubble, Slider } from "react-native-awesome-slider";
import fonts from "../../theme/fonts";
import metrics from "../../theme/metrics";
import { Colors } from "../../theme/colors";
import Animated, { withTiming } from "react-native-reanimated";
import { memo, useCallback, useRef, useState } from "react";
import { LayoutConfig } from "../../utils/layout";
import { secToMinSec } from "../../utils/conversions";
import BubbleImage from "./bubble";

interface VideoSlider {
    sliderProgress:Animated.SharedValue<number>,
    minValue:Animated.SharedValue<number>,
    maxValue:Animated.SharedValue<number>,
    cacheValue:Animated.SharedValue<number>,
    onSlideComplete:(data:any) => void;
    _onSlideStart:() => void;
    // onValueChange:(data:any) => void;
    thumbSequence:Animated.SharedValue<number>;
    isOptionsShown:Animated.SharedValue<number>;
}



 function VideoSlider({thumbSequence,isOptionsShown,sliderProgress,_onSlideStart,onSlideComplete,minValue,maxValue,cacheValue}:VideoSlider) {

    console.log("--------------------- [Slider Render] ---------------------");

    // const [imgURL,setImgURL] = useState("");


    const onValueChange = useCallback((data:number) => {
        console.log("Scrub",Math.floor(Math.abs(sliderProgress.value) / 20));
        // console.log("Slide start val",);
        thumbSequence.value = Math.round(Math.abs(sliderProgress.value) / 20);
        sliderProgress.value = data;
        isOptionsShown.value = withTiming(1);
        
        // setImgURL(`http://192.168.0.104:3000/witch/thumb/output_${formattedNumber}.jpg`);
        
    },[])


    return (
        <View style={Styles.bottomSlider}>
            <View style={Styles.sliderTime}>
                {/* <RegularText styles={{fontSize:fonts.size.font12}}>{currentTime.value}</RegularText> */}
            </View>
            <Slider
                style={Styles.slider} 
                progress={sliderProgress}
                minimumValue={minValue}
                maximumValue={maxValue}
                sliderHeight={3}
                onValueChange={onValueChange}
                
                // isScrubbing={true}
                renderThumb={() => <View style={{...StyleSheet.absoluteFillObject,top:-8,width:14,height:14,backgroundColor:'white',borderRadius:10,}} />}
                // onValueChange={onSliderChange}
                cache={cacheValue}
                onSlidingComplete={onSlideComplete}
                onSlidingStart={_onSlideStart}
                // bubble={(s:number) => `hello`}
                bubbleTranslateY={-100}
                renderBubble={() => <BubbleImage thumbSequence={thumbSequence} /> }
                // renderMark={() => <View style={{width:30,height:30,backgroundColor:'red'}} />}
                theme={{
                    cacheTrackTintColor:'white',
                    minimumTrackTintColor:Colors.primary,
                    maximumTrackTintColor:'rgba(147,134,120,0.6)',
                    bubbleBackgroundColor:Colors.primary
                }}
            />
            <View style={Styles.sliderTime}>
                {/* <RegularText styles={{fontSize:fonts.size.font12}}>00 : {secToMinSec(maxValue.value)}</RegularText> */}
            </View>
        </View>
    )
}


const Styles = StyleSheet.create({

    sliderTime:{
        maxWidth:100,
        textAlign:'center',
    },
    bottomSlider:{
        position:'absolute',
        bottom:0,
        right:0,
        left:0,
        height:LayoutConfig.videoPlayer.bottomOptions,
        flexDirection:'row',
        alignItems:'center',
        zIndex:3
    },
    slider:{
        ...StyleSheet.absoluteFillObject,
        borderRadius:30,
    },
})

export default memo(VideoSlider);