import { ImageProps, ImageSourcePropType, Pressable, StyleSheet , Image } from "react-native";
import { MediumText } from "../../utils/Text";
import fonts from "../../theme/fonts";
import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { IconsProperty } from "./constants";
import metrics from "../../theme/metrics";

interface OvalButtonProps {
    label:string,
    onPress:() => void,
    source?:ImageSourcePropType,
    remoteUrl?:string
}

export function PrimaryOvalButton({onPress,label,source,remoteUrl}:OvalButtonProps) {
    return(
        <Pressable style={[Styles.Button,Styles.primary]} onPress={onPress}>
            {source && <Image style={Styles.imageIcon} source={source} />}
            {remoteUrl && <Image style={Styles.imageIcon} source={{uri:'https://img.icons8.com/?size=2x&id=apf2ilaOdOoT&format=png'}} />}
            {/* <Image style={{width:20,height:20}} source={{uri:'https://img.icons8.com/?size=2x&id=apf2ilaOdOoT&format=png'}} /> */}
            <MediumText styles={{fontSize:fonts.size.font14,textAlign:'center'}}>{label}</MediumText>
        </Pressable>
    )
}

export function SecondaryOvalButton({onPress,label,source,remoteUrl}:OvalButtonProps) {
    return(
        <Pressable style={[Styles.Button,Styles.secondary]} onPress={onPress}>
            {source && <Image style={Styles.imageIcon} source={source} />}
            {remoteUrl && <Image style={Styles.imageIcon} source={{uri:'https://img.icons8.com/?size=2x&id=apf2ilaOdOoT&format=png'}} />}
            {/* <Image style={{width:20,height:20}} source={{uri:'https://img.icons8.com/?size=2x&id=apf2ilaOdOoT&format=png'}} /> */}
            <MediumText styles={{fontSize:fonts.size.font14,textAlign:'center'}}>{label}</MediumText>
        </Pressable>
    )
}

const Styles = StyleSheet.create({
    primary:{
        backgroundColor:Colors.primary,
    },
    secondary:{
        backgroundColor:Colors.darkGrey
    },
    Button:{
        // width:metrics.screenWidth * 0.4,
        maxWidth:200,
        // width:'100%',
        flex:1,
        paddingTop:Spacing.buttonTopPadding,
        paddingBottom:Spacing.buttonTopPadding,
        paddingLeft:Spacing.buttonLeftPadding,
        paddingRight:Spacing.buttonLeftPadding,
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:10
    },
    imageIcon:{
        width:IconsProperty.width,
        height:IconsProperty.height,
        resizeMode:'contain'
    }
})