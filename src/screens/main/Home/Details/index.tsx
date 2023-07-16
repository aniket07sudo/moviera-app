import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { HomeStackParamList } from "../../../../ts/types/navigation";
import Animated from "react-native-reanimated";

type HomeDetailsScreenProps = NativeStackScreenProps<HomeStackParamList,'HomeDetailsScreen'>

const HomeDetails = ({navigation,route}:HomeDetailsScreenProps) => {
    // console.log("imageUrl",imageUrl);
    
    return (
        <View style={{flex:1}}>
            <Animated.Image sharedTransitionTag={`${route.params.id}`} source={{uri:route.params.imageUrl}} style={{height:'50%',width:'100%'}}  />
            <Text style={{color:'red'}}>Home Details</Text>
            <Text style={{color:'red'}}>Id : {route.params.id}</Text>
        </View>
    )
}

export default HomeDetails;