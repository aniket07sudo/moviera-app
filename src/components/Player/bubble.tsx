import { memo, useEffect, useMemo, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { runOnJS, runOnUI, useAnimatedReaction } from "react-native-reanimated";
import { Colors } from "../../theme/colors";
import { LayoutConfig } from "../../utils/layout";


function BubbleImage({thumbSequence}) {

    console.log("-------------- thumbSequence Rerender ------------------");

    const [imgURL,setImgURL] = useState("http://192.168.0.104:3000/witch/thumb/output_001.jpg");

    // console.log("imgURL",imgURL);


    function updateImageUrl(data) {
        console.log("daaa",data);

        let formattedNumber = data.toLocaleString('en-US', {
            minimumIntegerDigits: 3,
            useGrouping: false
          })
        
        setImgURL(`http://192.168.0.104:3000/witch/thumb/output_${formattedNumber}.jpg`);
    }

    useAnimatedReaction(
        () => {
            // console.log("Thum Value",thumbSequence.value);
            runOnJS(updateImageUrl)(thumbSequence.value)
            

        },
        () => {
            
        },
    [])

    const ImageRender = useMemo(() => (
        <Image style={Styles.imageContainer} source={{uri:imgURL}} />
    ),[imgURL])
    
    return (
        <View style={Styles.bubbleContainer}>
            {/* <Image style={Styles.imageContainer} source={{uri:imgURL}} /> */}
            {ImageRender}
        </View>
    )
}

const Styles = StyleSheet.create({
    bubbleContainer:{
        width:LayoutConfig.videoPlayer.bubbleWidth,
        height:LayoutConfig.videoPlayer.bubbleHeight,
        backgroundColor:Colors.backgroundColor
    },
    imageContainer:{
        width:LayoutConfig.videoPlayer.bubbleWidth,
        height:LayoutConfig.videoPlayer.bubbleHeight
    }
})

export default memo(BubbleImage);