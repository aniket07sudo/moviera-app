import { Pressable, View , Image, StyleSheet, Modal } from "react-native";
import { RegularText } from "../../utils/Text";
import fonts from "../../theme/fonts";
import { memo } from "react";
import { LayoutConfig } from "../../utils/layout";
import PlayerModalDialog from "./playerModalDialog";
import { runOnUI, useSharedValue } from "react-native-reanimated";
import React from "react";


function BottomOptions({show}) {

    console.log("--------------------- [Bottom Options Render] ---------------------");

    const updatePlayerState = ({show}) => {
        console.log("click");
        
        runOnUI(() => {
            show.value = !show.value;
        })();
        
    }
    

    return(
        <View style={Styles.bottomOptions}>
            <Pressable style={Styles.bottomIconContainer} onPress={updatePlayerState}>
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
        // ...StyleSheet.absoluteFillObject,
        // position:'absolute',
        // right:0,
        // left:0,
        // bottom:0,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        // flex:1,
        height:LayoutConfig.videoPlayer.bottomOptions,
        // position:'absolute',
        // right:0,
        // left:0,
        // bottom:0,
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