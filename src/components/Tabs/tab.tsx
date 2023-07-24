import { StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MediumText } from "../../utils/Text";
import { Spacing } from "../../theme/spacing";
import metrics from "../../theme/metrics";

interface TabProps {
    title:string,
    onMeasurement?:(measurement:number) => void
    onPress?:() => void,
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
        width:(metrics.screenWidth / 3) - (Spacing.screenPadding)
    },
    text:{
        fontSize:14
    }
})