import { RefObject, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Tabs from "./tabs";
import MaskedView from "@react-native-masked-view/masked-view";
import Animated, { Extrapolation, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming , scrollTo } from "react-native-reanimated";
import { TAB_HEIGHT } from ".";
import { TabsDataProps } from "../../screens/main/Details";
import { SCREEN_WIDTH } from "../../screens/main/Home";
import metrics from "../../theme/metrics";

interface TabHeaderProps {
    data:TabsDataProps[],
    ScrollX:Animated.SharedValue<number>,
    ScrollRef:RefObject<FlatList>
}

export default function TabHeader({data,ScrollX,ScrollRef}:TabHeaderProps) {

    const [transforms,setTransforms] = useState(new Array(data.length).fill(0));
    const index = useSharedValue(0);
    const [measurements,setMeasurements] = useState<number[]>(new Array(data.length).fill(0));

    useEffect(() => {
        let temp:number[] = [];
        measurements.reduce((total,curr) => {
            temp.push(total);
            return total + curr;
        },0);
        setTransforms(temp);
        
    },[measurements])
    
    const handleOnPress = (i:number) => {
        if(ScrollRef.current) {
            ScrollRef.current?.scrollToIndex({
                index:i
            })
        }
        index.value = withTiming(i,{duration:300});
    }

    const handleSetMeasurements = (i:number,m:number) => {
        let newMeasure = [...measurements]
        let item = newMeasure[i];
        item = m;
        newMeasure[i] = item;
        setMeasurements(newMeasure);
    }

    

    const animatedIndicatorStyle = useAnimatedStyle(() => {
        
        const width = interpolate(index.value,
            data.map((_,i) => i),
            measurements,
            {
                extrapolateLeft:Extrapolation.CLAMP,
                extrapolateRight:Extrapolation.CLAMP
            }
        )

        // const translateX = interpolate(index.value,
        //     data.map((_,i) => i),
        //     transforms,
        //     {
        //         extrapolateLeft:Extrapolation.CLAMP,
        //         extrapolateRight:Extrapolation.CLAMP
        //     }
        // )
        const translateX = interpolate(ScrollX.value,
            data.map((_,i) => i * SCREEN_WIDTH),
            transforms,
            {
                extrapolateLeft:Extrapolation.CLAMP,
                extrapolateRight:Extrapolation.CLAMP
            }
        )
        
        return {
            width,
            transform:[{translateX}]
        }
    },[measurements,transforms])

    return (
        <View style={Styles.container}>
            <View style={{...StyleSheet.absoluteFillObject}}>
                <Tabs 
                    tabsData={data} 
                    onMeasurement={handleSetMeasurements}
                />
            </View>
            <View>
                <Animated.View style={[{backgroundColor:'rgba(191, 191, 191,0.2)',borderRadius:24,flex:1},animatedIndicatorStyle]} />
            </View>
            <MaskedView style={StyleSheet.absoluteFill} maskElement={<Animated.View style={[{backgroundColor:'black',borderRadius:24,flex:1},animatedIndicatorStyle]}  />}>
                <View style={{...StyleSheet.absoluteFillObject}}>
                    <Tabs 
                        onPress={handleOnPress}
                        tabsData={data} 
                        // ScrollX={ScrollX}
                    />
                </View>
            </MaskedView>
        </View>
    )
}

const Styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height:30,
    }
})