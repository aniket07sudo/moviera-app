import { StyleSheet, View } from "react-native";
import Tab from "./tab";
import { TabsDataProps } from ".";

interface TabsProps {
    tabsData:TabsDataProps[],
    onMeasurement?:(index:number,measurement:number) => void,
    onPress?:(index:number) => void
}


export default function Tabs({tabsData,onMeasurement,onPress}:TabsProps) {
    
    return (
        <View style={Styles.overlay}>
            {tabsData.map((tab,index) => (
                <Tab onPress={onPress ? onPress.bind(null,index) : undefined} {...tab} onMeasurement={onMeasurement ? onMeasurement.bind(null,index) : undefined} key={index} />
            ))}
        </View>
    )
}

const Styles = StyleSheet.create({
    overlay:{
        ...StyleSheet.absoluteFillObject,
        flexDirection:'row'
    }
})