import { Dimensions, View, useWindowDimensions } from "react-native";
import { RegularText } from "../../utils/Text";
import metrics from "../../theme/metrics";
import { LayoutConfig } from "../../utils/layout";
import { runOnJS, useAnimatedReaction } from "react-native-reanimated";
import { useState } from "react";
import { msToTime } from "../../utils/conversions";
import fonts from "../../theme/fonts";

const ThumbSize = 20;

const VideoHeight = Dimensions.get('window').width;


const PlayerTimer = ({sliderProgress}) => {

    const {width} = useWindowDimensions();

    console.log("Timer height",width);
    
    
    const [currentTime,setCurrentTime] = useState('');

    const updateTime = (time:number) => {
        let finalTime = msToTime(time);
        setCurrentTime(finalTime);
    }

    useAnimatedReaction(
        () => sliderProgress.value,
        () => {
            runOnJS(updateTime)(sliderProgress.value);
        },[]
    )

    return (
    
        <View style={{position:'absolute',flexDirection:'row',justifyContent:'flex-end',width:width - 2 * ThumbSize,bottom:LayoutConfig.videoPlayer.bottomOptions + 14,right:0,left:ThumbSize}}>
            <RegularText styles={{fontSize:fonts.size.font14}}>{currentTime}</RegularText>
        </View>
    )
}

export default PlayerTimer;