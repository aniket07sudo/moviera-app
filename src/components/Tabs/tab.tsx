import { StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MediumText } from "../../utils/Text";
import { useEffect } from "react";
import { TAB_HEIGHT } from ".";

interface TabProps {
    title:string,
    onMeasurement?:(measurement:number) => void
    onPress?:() => void
}

export default function Tab({title,onMeasurement,onPress}:TabProps) {

    return (
        <TouchableWithoutFeedback {...{onPress}}>
            <View onLayout={onMeasurement ? ({nativeEvent : { layout : { width } }}) => onMeasurement(width) : undefined} style={Styles.container}>
                <MediumText>{title}</MediumText>
            </View>
        </TouchableWithoutFeedback>
    )
}

const Styles = StyleSheet.create({
    container:{
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginRight:8,
        paddingLeft:6,
        paddingRight:6
    },
    text:{
        fontSize:14
    }
})