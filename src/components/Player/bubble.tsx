import { memo, useEffect, useState } from "react";
import { Image, View } from "react-native";
import { runOnJS, runOnUI, useAnimatedReaction } from "react-native-reanimated";


function BubbleImage({thumbSequence}) {

    console.log("-------------- thumbSequence Rerender ------------------");

    const [imgURL,setImgURL] = useState("http://192.168.0.104:3000/witch/thumb/output_001.jpg");

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
            console.log("Thum Value",thumbSequence.value);
            runOnJS(updateImageUrl)(thumbSequence.value)
            

        },
        () => {
            
        },
    [])
    
    return (
        <View style={{width:300,height:200}}>
            <Image style={{width:300,height:200}} source={{uri:imgURL}} />
        </View>
    )
}

export default memo(BubbleImage);