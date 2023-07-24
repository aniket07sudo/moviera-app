import { StyleProp, Text , TextStyle, ViewStyle , View } from "react-native";
import Fonts from '../theme/fonts'

interface TextProps {
    children:string | JSX.Element | JSX.Element[] | React.ReactNode,
    styles?:StyleProp<TextStyle>,
    box?:boolean
}

interface BoxTextProps {
    children:JSX.Element | JSX.Element[]
}

export function BoxText({children}:BoxTextProps) {

    return (
        <View style={{borderColor:'white',borderWidth:1,paddingLeft:2,paddingRight:2,borderRadius:4,flexDirection:'column',justifyContent:'center'}}>
            {children}
        </View>
    )
}

export function RegularText({children,styles,box}:TextProps) {

    return (
        <Text style={[{fontFamily:Fonts.type.poppinsRegular,color:'white',fontSize:Fonts.size.font14},styles]}>{children}</Text>
    )
}



export function MediumText({children,styles}:TextProps) {

    return (
        <Text style={[{fontFamily:Fonts.type.poppinsMedium,color:'white'},styles]}>{children}</Text>
    )
}

export function SemiBold({children,styles}:TextProps) {

    return (
        <Text style={[{fontFamily:Fonts.type.poppinsSemi,color:'white'},styles]}>{children}</Text>
    )
}

export function BoldText({children,styles}:TextProps) {

    return (
        <Text style={[{fontFamily:Fonts.type.poppinsBold,color:'white'},styles]}>{children}</Text>
    )
}
