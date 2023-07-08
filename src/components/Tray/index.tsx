import React from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { MediumText, RegularText } from "../../utils/Text";
import fonts from "../../theme/fonts";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { TrayDataType } from "../../screens/main/Home/constants";

interface TrayProps {
    label:string,
    data:TrayDataType[]
}

const TrayComponent = ({data,label}:TrayProps) => {

    return (
        <View style={Styles.container}>
            <TouchableOpacity>
                <View style={Styles.headContainer}>
                    <MediumText styles={{fontSize:fonts.size.font16}}>{label}</MediumText>
                    <MediumText>See All</MediumText>
                </View>
            </TouchableOpacity>
            <FlatList  
                data={data}
                horizontal
                
                renderItem={({item,index}) => (
                    <TouchableWithoutFeedback style={Styles.cardContainer} key={index}>
                        <Image source={item.image} style={Styles.imageContainer} />
                    </TouchableWithoutFeedback>
                )}
            />
        </View>
    )
}

const Styles = StyleSheet.create({
    container:{
        
    },
    cardContainer:{
        marginLeft:16,
        borderRadius:4,
        overflow:'hidden',
        // borderWidth:1,
        // borderColor:'#222425'
    },
    headContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10,
        paddingLeft:18,
        paddingTop:16,
        paddingRight:18
    },
    imageContainer:{
        width:130,
        height:170,
        resizeMode:'cover'
    }
})

export default TrayComponent;