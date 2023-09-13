import { Pressable, View , Image, StyleSheet } from "react-native";
import { RegularText } from "../../utils/Text";
import fonts from "../../theme/fonts";
import { memo } from "react";
import { LayoutConfig } from "../../utils/layout";


function BottomOptions() {

    console.log("--------------------- [Bottom Options Render] ---------------------");
    

    return(
        <View style={Styles.bottomOptions}>
            <Pressable style={Styles.bottomIconContainer}>
                <Image style={{width:22,height:22}} source={require('../../assets/png/subtitles.png')} />
                <RegularText styles={{fontSize:fonts.size.font10}}>Audio / Subtitles</RegularText>
            </Pressable>
            <Pressable style={Styles.bottomIconContainer}>
                <Image style={{width:22,height:22}} source={require('../../assets/png/player/quality.png')} />
                <RegularText styles={{fontSize:fonts.size.font10}}>Quality</RegularText>
            </Pressable>
            <Pressable style={Styles.bottomIconContainer}>
                <Image style={{width:30,height:26}} source={require('../../assets/png/speed.png')} />
                <RegularText styles={{fontSize:fonts.size.font10}}>Speed</RegularText>
            </Pressable>
            <Pressable style={Styles.bottomIconContainer}>
                <Image style={{width:30,height:26}} source={require('../../assets/png/player/episodes.png')} />
                <RegularText styles={{fontSize:fonts.size.font10}}>Episodes</RegularText>
            </Pressable>
            <Pressable style={Styles.bottomIconContainer}>
                <Image style={{width:22,height:22}} source={require('../../assets/png/next.png')} />
                <RegularText styles={{fontSize:fonts.size.font10}}>Next Episode</RegularText>
            </Pressable>
        </View>
    )
}

const Styles = StyleSheet.create({
    bottomOptions:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        // flex:1,
        height:LayoutConfig.videoPlayer.bottomOptions
        // backgroundColor:'red'
    },
    bottomIconContainer:{
        flexDirection:'column',
        alignItems:'center',
        gap:4,
        maxHeight:80,
    },
})

export default  memo(BottomOptions);