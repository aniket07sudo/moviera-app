import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Tabs from "./tabs";
import MaskedView from "@react-native-masked-view/masked-view";
import Animated, { Extrapolation, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { TAB_HEIGHT, TabsDataProps } from ".";

interface TabHeaderProps {
    tabsData:TabsDataProps[]
}

export default function TabHeader({tabsData}:TabHeaderProps) {

    // const measurements = [76.66666412353516, 33.333335876464844, 107.33332824707031, 81.00001525878906]
    const [transforms,setTransforms] = useState(new Array(tabsData.length).fill(0));
    const index = useSharedValue(0);
    const [measurements,setMeasurements] = useState<number[]>(new Array(tabsData.length).fill(0));

    // const [index,setIndex] = useState(0);

    useEffect(() => {
        let temp:number[] = [];
        measurements.reduce((total,curr) => {
            temp.push(total);
            return total + curr + 8;
        },0);
        setTransforms(temp);
        
    },[measurements])
    

    console.log("Measuremnents",measurements,transforms);

    

    const handleOnPress = (i:number) => {
        // console.log("Setting State",i,measurements);
        index.value = withTiming(i,{duration:300});
    }



    const handleSetMeasurements = (i:number,m:number) => {
        let newMeasure = [...measurements]
        let item = newMeasure[i];
        item = m;
        newMeasure[i] = item;
        // console.log("setting measurements",newMeasure,i,m);
        setMeasurements(newMeasure);
    }

    const animatedIndicatorStyle = useAnimatedStyle(() => {
        console.log("animated measurements",measurements,transforms);
        
        const width = interpolate(index.value,
            tabsData.map((_,i) => i),
            measurements,
            // [76.66666412353516, 33.333335876464844, 107.33332824707031, 81.00001525878906],
            {extrapolateLeft:Extrapolation.CLAMP,
            extrapolateRight:Extrapolation.CLAMP}
        )

        const translateX = interpolate(index.value,
            tabsData.map((_,i) => i),
            transforms,
            {extrapolateLeft:Extrapolation.CLAMP,
                extrapolateRight:Extrapolation.CLAMP}
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
                    // onPress={handleOnPress}
                    tabsData={tabsData} 
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
                        tabsData={tabsData} 
                        // onMeasurement={handleSetMeasurements}
                    />
                </View>
            </MaskedView>
            
        </View>
    )
}

const Styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        height:30
    }
})