import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Button, ImageBackground, Pressable, StyleSheet, Text, View , Image, ScrollView, Platform, StatusBar } from "react-native";
import { HomeDetailsScreenProps, HomeStackParamList } from "../../../ts/types/navigation";
import Animated, { Easing, FadeIn, FadeInDown, FadeInRight, FadeInUp, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { Data, DataProps } from "../Home/HeroData";
import { SCREEN_HEIGHT } from "../Home";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../../../theme/colors";
import { BoxText, MediumText, RegularText, SemiBold } from "../../../utils/Text";
import fonts from "../../../theme/fonts";
import { Spacing } from "../../../theme/spacing";
import DotIcon from "../../../assets/icons/shared/Circle";
import StarIcon from "../../../assets/icons/shared/star";
import LikeIcon from "../../../assets/icons/shared/Like";
import PlusIcon from "../../../assets/icons/shared/plus";
import metrics from "../../../theme/metrics";
import BackIcon from "../../../assets/icons/shared/back";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ShareIcon from "../../../assets/icons/shared/share";
import Tabs from "../../../components/Tabs";
import Episode from "./Seasons";
import Player from "../../../components/Player";
import PreviewPlayer from "../../../components/PreviewPlayer";
import { useDispatch, useSelector } from "react-redux";
import { IAppState } from "../../../ts/interfaces";
import { useNavigation } from "@react-navigation/native";
import Orientation from "react-native-orientation-locker";

const AnimatedImageBackgrond = Animated.createAnimatedComponent(ImageBackground);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const IMAGE_HEIGHT = SCREEN_HEIGHT * 0.40;

const PLAY_ICON_WIDTH = 50;
const PLAY_ICON_HEIGHT = 50;

export interface TabsDataProps {
    id:number,
    title:string
}

export const tabsData : TabsDataProps[] = [
    // {
    //     id:1,
    //     title:'Episode'
    // },
    {
        id:2,
        title:'Similar'
    },
    {
        id:3,
        title:'About'
    },
]

const HomeDetails = ({navigation,route}:HomeDetailsScreenProps) => {
    // console.log("imageUrl",imageUrl);
    const [details,setDetails] = useState<DataProps>();
    const isPreviewReady = useSharedValue(0);

    const modalVisible = useSelector((state:IAppState) => state.ui.playerModal);
    const dispatch = useDispatch();

    const Padding = useSafeAreaInsets();

    useEffect(() => {
        const findDetails = Data.find(e => e.id == route.params.id);
        console.log("Details",findDetails);
        
        setDetails(findDetails);
    },[])

    const gotoPlayer = () => {
        console.log("Pressed");
        Orientation.lockToLandscapeLeft();
        navigation.navigate('VideoPlayer');
    }

    const goBack = () => {
        navigation.goBack();
    }

    const animatedPreviewStyles = useAnimatedStyle(() => {

        return {
            opacity:isPreviewReady.value
        }
    })
    
    return (
        <>
        {/* <StatusBar backgroundColor={Colors.secondary} /> */}
        <Animated.View entering={FadeIn.delay(500).duration(300)} style={[Styles.headerContainer,{top:Padding.top}]}>
                <Pressable onPress={goBack}>
                    <BackIcon width={28} height={28} color={Colors.white} />
                </Pressable>
                <Pressable>
                    <ShareIcon width={24} height={24} color={Colors.white} />
                </Pressable>
        </Animated.View>
        <ScrollView style={{flex:1}}>
        <Pressable onPress={gotoPlayer}>

            <View style={[Styles.imageContainer]}>
                {/* <Pressable onPress={onPress} style={[StyleSheet.absoluteFillObject,{zIndex:4}]}> */}
                    {/* <View style={Styles.playIconContainer}>
                        <Image style={Styles.playIcon} source={require('../../../assets/png/play_white.png')} />
                    </View> */}
                {/* </Pressable> */}
                
                <Animated.Image style={Styles.Image} source={route.params.imageUrl} />
                    {/* <Animated.View style={[animatedPreviewStyles,{position:'absolute',top:0,bottom:0}]}>
                        <PreviewPlayer isPreviewReady={isPreviewReady} />
                    </Animated.View> */}
                <AnimatedLinearGradient entering={FadeInDown.delay(400).duration(400)} style={Styles.bottomGradient} colors={['transparent',Colors.secondary]} />
            </View>
            </Pressable>

            <View  style={Styles.mainContainer}>
                <View style={Styles.textDetailsContainer}>
                    <View style={Styles.textContainer}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                            <SemiBold styles={Styles.videoTitle}>Disney's Aladdin</SemiBold>
                            <View style={Styles.rightText}>
                                <Pressable>
                                    <PlusIcon width={24} height={24} color="white" />
                                </Pressable>
                                <View style={Styles.sideIcons}>
                                    <Pressable>
                                        <LikeIcon width={24} height={24} color="white" />
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        <View style={Styles.tagsContainer}>
                            <View style={Styles.tagGenreContainer}>
                                <MediumText styles={Styles.genre}>Adventure <DotIcon width="12" height="12" color={Colors.textGrey} /> Comedy</MediumText>
                                <View style={Styles.tags}>
                                    <MediumText styles={Styles.matchPercentage}>95% Match</MediumText>

                                    <RegularText styles={{fontSize:fonts.size.font12}}>2012</RegularText>
                                    <BoxText>
                                        <RegularText styles={{fontSize:fonts.size.font10}} box>18+</RegularText>
                                    </BoxText>
                                    {/* <Image style={{width:20,height:20}} source={require('../../../../assets/png/18_plus.png')} /> */}
                                    <View style={Styles.iconContainer}>
                                        {/* <Image style={Styles.tagIcon} source={require('../../../../assets/png/hd.png')} /> */}
                                        <Image style={Styles.tagIcon} source={require('../../../assets/png/4k.png')} />
                                    </View>
                                    <RegularText styles={{fontSize:fonts.size.font12}}>2h 2m</RegularText>
                                </View>
                            </View>
                            <View style={Styles.rating}>
                                <StarIcon width={20} height={20} color={Colors.ratingColor} />
                                <MediumText styles={{fontSize:fonts.size.font12}}>4.5</MediumText>
                                <Image style={{width:36,height:18}} source={require('../../../assets/png/imdb.png')} />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{marginTop:Spacing.headingTextBottomMargin}}>
                    <RegularText styles={{fontSize:fonts.size.font12,textAlign:'left'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos odit nisi doloribus fugiat rem iste harum qui error quo soluta.</RegularText>
                </View>
            </View>
                <Episode />
                <Tabs tabsData={tabsData} />
                {/* <Player /> */}
        </ScrollView>
        </>
    )
}

const Styles = StyleSheet.create({
    imageContainer:{
        height:IMAGE_HEIGHT,
        width:'100%',
        position:'relative',
        backgroundColor:Colors.secondary
    },
    iconContainer:{
        width:26,
        height:18
    },
    tagIcon:{
        width:'100%',
        height:'100%'
    },
    playIconContainer:{
        backgroundColor:Colors.primary,
        position:'absolute',
        zIndex:6,
        top:(IMAGE_HEIGHT / 2) - (PLAY_ICON_HEIGHT / 2),
        left:(metrics.screenWidth / 2) - (PLAY_ICON_WIDTH / 2),
        borderRadius:Spacing.roundedButtonPadding * 2,
        width:PLAY_ICON_WIDTH,
        height:PLAY_ICON_WIDTH,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    headerContainer:{
        flex:1,
        position:'absolute',
        zIndex:5,
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        paddingLeft:Spacing.buttonLeftPadding,
        paddingRight:Spacing.buttonLeftPadding,
    },
    playIcon:{
        width:PLAY_ICON_WIDTH - PLAY_ICON_WIDTH / 1.8,
        height:PLAY_ICON_HEIGHT - PLAY_ICON_HEIGHT / 1.8
    },
    tagGenreContainer:{
        flexDirection:'column',
        gap:Spacing.buttonTopPadding,
    },
    bottomGradient:{
        position:'absolute',
        bottom:0,
        width:'100%',
        left:0,
        right:0,
        height:70,
        zIndex:1
    },
    rating:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        gap:2
    },
    Image:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
    },
    matchPercentage:{
        color:Colors.sucess,
        fontSize:fonts.size.font12
    },
    rightText:{
        flexDirection:'row',
        alignItems:'center',
        gap:10
    },
    sideIcons:{

    },
    mainContainer:{
        backgroundColor:Colors.secondary,
        paddingLeft:Spacing.screenPadding,
        paddingRight:Spacing.screenPadding
    },
    textDetailsContainer:{
        marginBottom:Spacing.headingTextBottomMargin,
        marginTop:Spacing.headingTextBottomMargin,
    },
    videoTitle:{
        fontSize:fonts.size.font24,
        marginBottom:Spacing.headingTextBottomMargin - 8
    },
    genre:{
        color:Colors.textGrey,
        fontSize:fonts.size.font12
    },
    tagsContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-end',
        marginTop:Spacing.headingTextBottomMargin,
    },
    tags:{
        flexDirection:'row',
        gap:10,
        alignItems:'center'
    },
    textContainer:{
        justifyContent:'center',

    },
    buttons:{
        flexDirection:'row',
        gap:20,
        marginTop:Spacing.headingTextBottomMargin,
        marginBottom:Spacing.headingTextBottomMargin
    },
    primaryButton:{
        backgroundColor:Colors.primary,
        width:'50%'
    },

})

export default HomeDetails;