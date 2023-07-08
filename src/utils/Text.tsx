import { Text , TextStyle } from "react-native";
import Fonts from '../theme/fonts'

interface TextProps {
    children:any,
    styles?:TextStyle
}

export function RegularText({children,styles}:TextProps) {

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
