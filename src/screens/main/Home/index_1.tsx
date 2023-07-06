import React, { useEffect, useState } from "react";
import { Animated, Dimensions, ImageBackground,StatusBar,StyleSheet, Text, View , FlatList, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { RegularText , BoldText, SemiBold, MediumText } from "../../../utils/Text";
import fonts from "../../../theme/fonts";
import {Data} from './HeroData'
import LinearGradient from "react-native-linear-gradient";
import { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from "../../../theme/colors";
import MaskedView from "@react-native-masked-view/masked-view";
import { Rect, Svg } from "react-native-svg";
import CarouselItem from "./item";


const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;

const ITEM_HEIGHT = SCREEN_HEIGHT * 0.65;


// const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
// const AnimatedSVG = Animated.createAnimatedComponent(Svg);


const HomeScreen = ({navigation}) => {

    const ScrollX = new Animated.Value(0);
    // const ScrollHandler = useAnimatedScrollHandler({
    //     onScroll : ({ contentOffset : { x : value } }) => {
    //         ScrollX.value = value;
    //     }
    // });
    // const {t} = useTranslation();

    return (
     <View style={{flex:1}}>
        <StatusBar barStyle={'light-content'} />
        <LinearGradient colors={[Colors.secondary,'transparent']} style={Styles.statusBarGradient} />
        <Animated.FlatList
            data={Data}
            showsHorizontalScrollIndicator={false} 
            decelerationRate={0} 
            snapToAlignment={'center'} 
            snapToInterval={SCREEN_WIDTH} 
            bounces={false} 
            scrollEventThrottle={16} 

            horizontal 
            onScroll={Animated.event(
                [{nativeEvent:{contentOffset: { x :ScrollX }}}],
                {useNativeDriver:true}
            )} 
            renderItem={({item,index}) => {

                // const translateX = interpolate(ScrollX,
                //     [(index - 1) * SCREEN_WIDTH,index * SCREEN_WIDTH,(index + 1) * SCREEN_WIDTH],
                //     [-SCREEN_WIDTH * 0.8,0,SCREEN_WIDTH * 0.8]
                // )
                const translateX = ScrollX.interpolate({
                    inputRange:[(index - 1) * SCREEN_WIDTH,index * SCREEN_WIDTH,(index + 1) * SCREEN_WIDTH],
                    outputRange:[-SCREEN_WIDTH * 0.7,0,SCREEN_WIDTH * 0.7]
                })

                return (
                    <View style={{width:SCREEN_WIDTH,height:ITEM_HEIGHT,justifyContent:'center',alignItems:'center'}}>
                        <View style={{width:SCREEN_WIDTH,height:ITEM_HEIGHT,overflow:'hidden',alignItems:'center'}}>
                            <Animated.Image style={[Styles.imageContainer,{transform:[{translateX}]}]} source={item.image} />
                        </View>
                    </View>
                )
            }}
        />
            {/* <Animated.ScrollView 
                contentContainerStyle={{overflow:'hidden'}} 
                showsHorizontalScrollIndicator={false} 
                decelerationRate={0} 
                snapToAlignment={'center'} 
                snapToInterval={SCREEN_WIDTH} 
                bounces={false} 
                scrollEventThrottle={16} 
                horizontal 
                onScroll={ScrollHandler} 
            >
                {Data.map((item,index) => (
                    <CarouselItem item={item} index={index} ScrollX={ScrollX} key={index} />
                ))}
            </Animated.ScrollView> */}
        <View style={Styles.trayContainer}>
            {/* <RegularText styles={{fontSize:fonts.size.font16}} >Hiii</RegularText> */}
        </View>
     </View>
    )
}

const Styles = StyleSheet.create({
    heroContainer:{
        alignItems:'center',
        justifyContent:'center',
    },
    contentContainer:{
        position:'relative',
        width:SCREEN_WIDTH,
        height:ITEM_HEIGHT
    },
    imageContainer:{
        width:SCREEN_WIDTH,
        height:ITEM_HEIGHT,
        resizeMode:'cover'
    },
    trayContainer:{
        backgroundColor:Colors.secondary
    },
    linearGradient:{
        position:'absolute',
        zIndex:1,
        width:SCREEN_WIDTH,
        height:ITEM_HEIGHT
    },
    statusBarGradient:{
        position:'absolute',
        zIndex:1,
        width:SCREEN_WIDTH,
        height:40
    },
})

export default HomeScreen;



