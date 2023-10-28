import React from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { MediumText, RegularText } from "../../utils/Text";
import fonts from "../../theme/fonts";
import { TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { TrayDataType } from "../../screens/main/Home/constants";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProps, HomeScreenProps } from "../../ts/types/navigation";
import Animated from "react-native-reanimated";
// import { HomeScreenNavigationProp } from "../../ts/types/navigation";

interface TrayProps {
    label:string,
    data:TrayDataType[],
    navigation:HomeScreenProps['navigation']
}

const TrayComponent = ({data,label,navigation}:TrayProps) => {

    // const navigation = useNavigation();

    return (
        <View style={Styles.container}>
                <View style={Styles.headContainer}>
                <MediumText styles={{fontSize:fonts.size.font16}}>{label}</MediumText>
                <TouchableOpacity>
                    {/* <MediumText>See All</MediumText> */}
                    <Image resizeMode="contain" source={require('../../assets/images/right-arrow.png')} />
                </TouchableOpacity>
                </View>
            <FlatList  
                data={data}
                horizontal
                renderItem={({item,index}) => (
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('HomeStack',{screen:'HomeDetailsScreen',params:{id:index,imageUrl:item.image}})} style={Styles.cardContainer} key={index}>
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
        resizeMode:'cover',
        overflow:"hidden"
    }
})

export default TrayComponent;