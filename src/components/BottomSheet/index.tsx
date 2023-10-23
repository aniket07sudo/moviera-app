import { StyleSheet, View } from "react-native";
import { RegularText } from "../../utils/Text";

interface BottomSheetProps {
    children:React.ReactNode | JSX.Element | JSX.Element[],
    isShow:boolean
}   

const BottomSheet = ({children,isShow}:BottomSheetProps) => {

    console.log("Bottom Sheet Render");
    

    return (
        <>
            {isShow && <View style={Styles.container}>
                {children}
            </View>}
        </>
        
    )
}

const Styles = StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor:'red',
        zIndex:10
    }
})

export default BottomSheet;