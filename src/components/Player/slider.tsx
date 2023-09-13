import { StyleSheet, View } from "react-native";
import { RegularText } from "../../utils/Text";
import { Slider } from "react-native-awesome-slider";
import fonts from "../../theme/fonts";
import metrics from "../../theme/metrics";
import { Colors } from "../../theme/colors";
import Animated from "react-native-reanimated";
import { memo } from "react";
import { LayoutConfig } from "../../utils/layout";

interface VideoSlider {
    sliderProgress:Animated.SharedValue<number>,
    minValue:Animated.SharedValue<number>,
    maxValue:Animated.SharedValue<number>,
    cacheValue:Animated.SharedValue<number>,
    onSlideComplete:(data:any) => void;
    _onSlideStart:() => void;
    onValueChange:() => void;
}

 function VideoSlider({sliderProgress,onValueChange,_onSlideStart,onSlideComplete,minValue,maxValue,cacheValue}:VideoSlider) {

    console.log("--------------------- [Slider Render] ---------------------");

    
    

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
                // bubble={(s:number) => `${secToMinSec(s)}`}
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
    },
    slider:{
        ...StyleSheet.absoluteFillObject,
        borderRadius:30,
    },
})

export default memo(VideoSlider);