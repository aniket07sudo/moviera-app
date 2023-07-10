import React, { createRef, useEffect, useRef, useState } from "react";
import { Dimensions, ImageBackground,StatusBar,StyleSheet, Text, View , FlatList, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import CarouselItem from "./item";
import LinearGradient from "react-native-linear-gradient";
import { Data, DataProps } from "../../screens/main/Home/HeroData";
import { Colors } from "../../theme/colors";
import DotsComponent from "./dots";

const SCREEN_WIDTH = Dimensions.get('screen').width;
const ITEM_WIDTH = SCREEN_WIDTH;

interface RefdataType {
    value: DataProps, 
    id: number;
}

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const viewabilityConfig = {
    itemVisiblePercentThreshold:80
}

const CarouselComponent = () => {
    const ScrollX = useSharedValue<number>(0);
    const cellRefs = useRef();
    const [refData,setRefData] = useState([]);

    const ScrollHandler = useAnimatedScrollHandler({
        onScroll:(event) => {
            ScrollX.value = event.contentOffset.x
        }
    })

    useEffect(() => {
        const d = Data.map((item,index) => ({value:item,id:index}));
        // console.log("D",d,Data);
        
        d.forEach(item => {
            cellRefs[item.id] = createRef();
        });
        console.log("Data",Data);
        
        setRefData([...d]);
    },[])

    const _onViewableItemsChanged = useRef(props => {
        const changed = props.changed;
        changed.forEach(item => {
            const cell = cellRefs[item.key];
            console.log("Cell",cell);
            if(cell) {
                if(item.isViewable) {
                    console.log("Played",item);
                    
                    // cell.current.play();
                    cell.current.startRender();
                } else {
                    console.log("Paused",item);
                    cell.current.removeRender();
                    // cell.current.pause();
                }
            }
        })
    })
    
    return (
        <View>
            <StatusBar barStyle={'light-content'} />
            <LinearGradient colors={[Colors.secondary,'transparent']} style={Styles.statusBarGradient} />
            <View style={Styles.carouselContainer}>
                <AnimatedFlatlist
                    data={refData}
                    horizontal
                    snapToInterval={ITEM_WIDTH}
                    decelerationRate={0}
                    bounces={false}
                    initialNumToRender={1}
                    maxToRenderPerBatch={2}
                    onViewableItemsChanged={_onViewableItemsChanged.current}
                    renderToHardwareTextureAndroid
                    scrollEventThrottle={16}
                    keyExtractor={(item,index) => index.toString()}
                    onScroll={ScrollHandler}
                    showsHorizontalScrollIndicator={false}
                    getItemLayout={(_data,index) => ({
                        length:ITEM_WIDTH,
                        offset:ITEM_WIDTH * index,
                        index
                    })}
                    viewabilityConfig={viewabilityConfig}
                    renderItem={({item,index}) => (
                        <CarouselItem key={index} ref={cellRefs[item.id]} pause={index != 0} item={item} index={index} ScrollX={ScrollX} />
                    )}
                />
                <View style={Styles.dotsContainer}>
                    <View style={Styles.dotsWrapper}>
                        {Data.map((item,index) => (
                            <DotsComponent key={index} ScrollX={ScrollX} index={index} />
                        ))}
                    </View>
                </View>
            </View>
            
        </View>
    )
}

const Styles = StyleSheet.create({
    dotsContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        position:'absolute',
        bottom:20
    },
    carouselContainer:{
        position:'relative'
    },
    dotsWrapper:{
        flexDirection:'row',
        gap:10,
        // backgroundColor:'red',
        width:5 * 20,
        justifyContent:'center'
    },
    statusBarGradient:{
        position:'absolute',
        zIndex:1,
        width:SCREEN_WIDTH,
        height:40
    },
})

export default CarouselComponent;



