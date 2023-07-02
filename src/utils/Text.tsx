import { Text , TextStyle } from "react-native";
import Fonts from '../theme/fonts'

interface TextProps {
    children:any,
    styles:TextStyle
}

export function RegularText({children,styles}:TextProps) {

    return (
        <Text style={[{fontFamily:Fonts.type.poppinsRegular},styles]}>{children}</Text>
    )
}
