import { Image, StyleSheet, View } from "react-native";
import { Spacing } from "../../theme/spacing";
import { MediumText, RegularText } from "../../utils/Text";
import fonts from "../../theme/fonts";

interface RectCardProps {
    title:string,
    description:string,
    duration:string
}

export default function RectCard({title,description,duration}:RectCardProps) {

    return (
        <View style={Styles.container}>
            <View style={Styles.imageContainer}>
                <Image style={Styles.image} source={{uri:'https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=40'}} />
            </View>
            <View style={Styles.textContainer}>
                <MediumText styles={{fontSize:fonts.size.font14,marginBottom:Spacing.headingTextBottomMargin}}>{title}</MediumText>
                <RegularText styles={{fontSize:fonts.size.font12}}>{description}</RegularText>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container:{
        width:180,
        marginRight:10,
    },
    textContainer:{
        height:'100%',
        paddingTop:Spacing.headingTextBottomMargin,
        flexGrow:1
    },
    imageContainer:{
        height:120,
        width:'100%',
        borderRadius:10,
        overflow:'hidden',
    },
    image:{
        width:200,
        height:'100%',
        resizeMode:'cover',
    }
})